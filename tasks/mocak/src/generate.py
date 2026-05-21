#!/usr/bin/env python3
import argparse
import base64
import shutil
import struct
import subprocess
import zlib
from pathlib import Path

PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"

FLAG = "hack4KrakCTF{pN8_tR7ma_W1e3ej_ni9z_ObR4z8k}"
PASSWORD = "zakopane_pod_rynkiem"
CHUNK_TYPE = b"ctFa"


def xor_bytes(data: bytes, key: bytes) -> bytes:
    if not key:
        raise ValueError("XOR key cannot be empty")

    return bytes(byte ^ key[i % len(key)] for i, byte in enumerate(data))


def make_png_chunk(chunk_type: bytes, data: bytes) -> bytes:
    if len(chunk_type) != 4:
        raise ValueError("PNG chunk type must be exactly 4 bytes")

    if not all((65 <= b <= 90) or (97 <= b <= 122) for b in chunk_type):
        raise ValueError("PNG chunk type must contain only ASCII letters")

    crc = zlib.crc32(chunk_type + data) & 0xFFFFFFFF

    return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", crc)


def iter_png_chunks(png: bytes):
    if not png.startswith(PNG_SIGNATURE):
        raise ValueError("Input file is not a valid PNG")

    offset = len(PNG_SIGNATURE)

    while offset < len(png):
        if offset + 8 > len(png):
            raise ValueError("Truncated PNG chunk header")

        length = struct.unpack(">I", png[offset : offset + 4])[0]
        chunk_type = png[offset + 4 : offset + 8]

        data_start = offset + 8
        data_end = data_start + length
        crc_end = data_end + 4

        if crc_end > len(png):
            raise ValueError("Truncated PNG chunk data")

        data = png[data_start:data_end]
        crc = png[data_end:crc_end]

        yield offset, length, chunk_type, data, crc

        offset = crc_end


def find_iend_offset(png: bytes) -> int:
    for offset, _length, chunk_type, _data, _crc in iter_png_chunks(png):
        if chunk_type == b"IEND":
            return offset

    raise ValueError("IEND chunk not found")


def add_metadata_with_exiftool(path: Path, password: str) -> None:
    encoded_password = base64.b64encode(password.encode()).decode()

    comment = f"restoration-key={encoded_password}"

    subprocess.run(
        [
            "exiftool",
            "-overwrite_original",
            f"-Comment={comment}",
            str(path),
        ],
        check=True,
    )


def add_ctfa_chunk(path: Path, flag: str, password: str) -> None:
    png = path.read_bytes()

    iend_offset = find_iend_offset(png)

    encrypted_flag = xor_bytes(flag.encode(), password.encode())

    # Payload:
    #   XOR1 = magic header
    #   rest = encrypted flag bytes
    payload = b"XOR1" + encrypted_flag

    ctfa_chunk = make_png_chunk(CHUNK_TYPE, payload)

    output_png = png[:iend_offset] + ctfa_chunk + png[iend_offset:]

    path.write_bytes(output_png)


def check_exiftool_exists() -> None:
    if shutil.which("exiftool") is None:
        raise RuntimeError("exiftool not found. Install it first, e.g. on Gentoo: emerge media-libs/exiftool")


def main():
    parser = argparse.ArgumentParser(description="Generate PNG CTF challenge with metadata key and XORed ctFa chunk.")

    parser.add_argument("input", help="Input clean PNG")
    parser.add_argument("output", help="Output challenge PNG")

    parser.add_argument(
        "--flag",
        default=FLAG,
        help=f"Flag to hide. Default: {FLAG}",
    )

    parser.add_argument(
        "--password",
        default=PASSWORD,
        help=f"XOR password. Default: {PASSWORD}",
    )

    args = parser.parse_args()

    check_exiftool_exists()

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        raise FileNotFoundError(input_path)

    shutil.copyfile(input_path, output_path)

    # Kolejność jest ważna:
    # 1. najpierw exiftool dodaje metadata,
    # 2. potem dodajemy custom chunk ctFa,
    # żeby exiftool nie przepisał/nie usunął niestandardowego chunka.
    add_metadata_with_exiftool(output_path, args.password)
    add_ctfa_chunk(output_path, args.flag, args.password)

    encoded_password = base64.b64encode(args.password.encode()).decode()

    print("[+] Challenge generated")
    print(f"[+] File: {output_path}")
    print("[+] Metadata field: Comment")
    print(f"[+] Metadata value: restoration-key={encoded_password}")
    print("[+] Custom PNG chunk: ctFa")
    print("[+] ctFa payload: XOR1 + xor(flag, base64_decoded_restoration_key)")
    print()
    print("[debug]")
    print(f"password: {args.password}")
    print(f"flag:     {args.flag}")


if __name__ == "__main__":
    main()
