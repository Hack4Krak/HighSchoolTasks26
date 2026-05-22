from pathlib import Path

from toolbox.utils.test_utils import RequestHelper, check_flag_in_response, check_status_code, load_flag_hash

ARCHIVE_HOST = "archiwum31.norbiros.dev"

request = RequestHelper(default_host=ARCHIVE_HOST)
task_path = Path(__file__).parent.parent


def test_archive_site_loads():
    response = request.get("/")
    check_status_code(response, 200)


def test_can_access_flag_from_discovered_site():
    response = request.get("/flag")
    check_status_code(response, 200)

    flag_hash = load_flag_hash(task_path)
    assert flag_hash is not None
    check_flag_in_response(response, flag_hash)
