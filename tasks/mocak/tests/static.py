import base64
import re
import struct
import zlib
from pathlib import Path

from toolbox.utils.test_utils import load_flag_hash, validate_flag_hash

TASK_DIR = Path(__file__).resolve().parents[1]
PNG_PATH = TASK_DIR / "assets" / "mocak.png"
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
FLAG_RE = re.compile(rb"^hack4KrakCTF\{[^}]+\}$")


def _xor(data: bytes, key: bytes) -> bytes:
    assert key, "restoration key must not be empty"
    return bytes(byte ^ key[index % len(key)] for index, byte in enumerate(data))


def _chunks(png: bytes) -> list[dict]:
    assert png.startswith(PNG_SIGNATURE)

    chunks = []
    offset = len(PNG_SIGNATURE)

    while offset < len(png):
        assert offset + 8 <= len(png), "truncated PNG chunk header"

        length = struct.unpack(">I", png[offset : offset + 4])[0]
        chunk_type = png[offset + 4 : offset + 8]
        data_start = offset + 8
        data_end = data_start + length
        crc_end = data_end + 4

        assert crc_end <= len(png), f"truncated PNG chunk {chunk_type!r}"

        data = png[data_start:data_end]
        stored_crc = struct.unpack(">I", png[data_end:crc_end])[0]
        calculated_crc = zlib.crc32(chunk_type + data) & 0xFFFFFFFF

        chunks.append({
            "offset": offset,
            "type": chunk_type,
            "data": data,
            "crc": stored_crc,
            "expected_crc": calculated_crc,
        })
        offset = crc_end

        if chunk_type == b"IEND":
            break

    return chunks


def _decode_text_chunk(data: bytes) -> tuple[str, str] | None:
    if b"\x00" not in data:
        return None

    keyword, text = data.split(b"\x00", 1)
    return keyword.decode("latin-1"), text.decode("latin-1")


def _extract_restoration_key(chunks: list[dict]) -> bytes:
    for chunk in chunks:
        if chunk["type"] != b"tEXt":
            continue

        decoded = _decode_text_chunk(chunk["data"])
        if decoded is None:
            continue

        _keyword, text = decoded
        match = re.search(r"restoration-key=([A-Za-z0-9+/=]+)", text)
        if match:
            return base64.b64decode(match.group(1), validate=True)

    raise AssertionError("restoration-key not found in PNG text metadata")


def _recover_flag() -> bytes:
    png = PNG_PATH.read_bytes()
    chunks = _chunks(png)

    assert chunks[0]["type"] == b"IHDR"
    assert chunks[-1]["type"] == b"IEND"
    assert all(chunk["crc"] == chunk["expected_crc"] for chunk in chunks)

    key = _extract_restoration_key(chunks)

    ctfa_chunks = [chunk for chunk in chunks if chunk["type"] == b"ctFa"]
    assert len(ctfa_chunks) == 1

    payload = ctfa_chunks[0]["data"]
    assert payload.startswith(b"XOR1")

    return _xor(payload.removeprefix(b"XOR1"), key)


def test_mocak_png_contains_valid_recoverable_flag() -> None:
    flag = _recover_flag()

    assert FLAG_RE.fullmatch(flag)


def test_recovered_flag_matches_configured_hash() -> None:
    flag_hash = load_flag_hash(TASK_DIR)
    flag = _recover_flag().decode()
    match = re.fullmatch(r"hack4KrakCTF\{([^}]+)\}", flag)

    assert match is not None
    assert flag_hash is not None
    assert validate_flag_hash(match.group(1), flag_hash)
