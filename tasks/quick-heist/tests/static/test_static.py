from pathlib import Path

import yaml

from toolbox.utils.test_utils import load_flag_hash, validate_flag_hash

task_path = Path(__file__).resolve().parents[2]
DOCKER_COMPOSE_PATH = task_path / "docker-compose.yaml"
FLAG_PREFIX = "hack4KrakCTF{"


def _extract_flag_from_compose() -> str:
    content = DOCKER_COMPOSE_PATH.read_text(encoding="utf-8")
    start = content.index(FLAG_PREFIX)
    end = content.index("}", start) + 1
    return content[start:end]


def test_flag_hash_matches_compose_flag():
    flag = _extract_flag_from_compose()
    inner = flag.removeprefix(FLAG_PREFIX).removesuffix("}")
    flag_hash = load_flag_hash(task_path)

    assert flag_hash is not None
    assert validate_flag_hash(inner, flag_hash)


def test_required_files_exist():
    for path in ["config.yaml", "description.md", "solution.md", "docker-compose.yaml"]:
        assert (task_path / path).is_file(), f"Missing required file: {path}"


def test_config_id_matches_directory():
    config = yaml.safe_load((task_path / "config.yaml").read_text(encoding="utf-8"))
    assert config["id"] == task_path.name
