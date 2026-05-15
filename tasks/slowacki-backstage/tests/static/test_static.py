import os
import subprocess
from pathlib import Path

from toolbox.utils.test_utils import load_flag_hash, validate_flag_hash

TASK_PATH = Path(__file__).resolve().parents[2]
ASSET_PATH = TASK_PATH / "assets" / "slowacki-backstage"
FLAG_PATH = TASK_PATH / "src" / "flag.txt"
ACCESS_CODE = b"DO_NOT_SOLVE_THIS_TASK_EXAM_CHEATING"


def test_flag_hash_matches_flag_file():
    flag = FLAG_PATH.read_text(encoding="utf-8").strip()
    inner_flag = flag.removeprefix("hack4KrakCTF{").removesuffix("}")
    flag_hash = load_flag_hash(TASK_PATH)

    assert flag_hash is not None
    assert validate_flag_hash(inner_flag, flag_hash)


def test_public_binary_does_not_contain_flag():
    binary = ASSET_PATH.read_bytes()
    flag = FLAG_PATH.read_bytes().strip()

    assert flag not in binary


def test_expected_payload_prints_flag():
    env = os.environ.copy()
    env["FLAG_PATH"] = str(FLAG_PATH)
    payload = ACCESS_CODE + b"\n" + b"A" * 32 + b"$C7NA\n"

    result = subprocess.run(
        [str(ASSET_PATH)],
        input=payload,
        capture_output=True,
        env=env,
        timeout=2,
        check=False,
    )

    assert FLAG_PATH.read_text(encoding="utf-8").strip() in result.stdout.decode("utf-8")
