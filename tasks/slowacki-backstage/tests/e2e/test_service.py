import os
import socket
from pathlib import Path

from toolbox.utils.test_utils import load_flag_hash, validate_flag_hash

TASK_PATH = Path(__file__).resolve().parents[2]
DESCRIPTION_PATH = TASK_PATH / "description.md"
SERVICE_PORT = 31338
ACCESS_CODE = b"DO_NOT_SOLVE_THIS_TASK_EXAM_CHEATING"


def _service_host() -> str:
    return "slowacki-backstage.hack4krak.pl" if os.getenv("TASKS_TARGET") == "prod" else "localhost"


def _talk(payload: bytes) -> str:
    with socket.create_connection((_service_host(), SERVICE_PORT), timeout=2) as connection:
        connection.sendall(payload)
        connection.shutdown(socket.SHUT_WR)
        chunks = []
        try:
            while chunk := connection.recv(4096):
                chunks.append(chunk)
        except ConnectionResetError:
            pass

    return b"".join(chunks).decode("utf-8", errors="replace")


def test_expected_payload_gets_valid_flag_from_network_service():
    output = _talk(ACCESS_CODE + b"\n" + b"A" * 32 + b"$C7NA\n")
    flag_hash = load_flag_hash(TASK_PATH)

    assert "Backstage access granted." in output
    assert "hack4KrakCTF{" in output
    assert flag_hash is not None

    flag = output.split("hack4KrakCTF{", 1)[1].split("}", 1)[0]
    assert validate_flag_hash(flag, flag_hash)


def test_wrong_access_code_is_rejected():
    output = _talk(b"wrong-code\n")

    assert "Invalid access code." in output
    assert "hack4KrakCTF{" not in output


def test_valid_code_without_overflow_does_not_get_flag():
    output = _talk(ACCESS_CODE + b"\nregular_guest\n")

    assert "Backstage access denied." in output
    assert "hack4KrakCTF{" not in output
