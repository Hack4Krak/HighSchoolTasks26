from pathlib import Path

from toolbox.utils.test_utils import RequestHelper, check_status_code, load_flag_hash, validate_flag_hash

request = RequestHelper(default_host="kompletnie-niepodejrzana-strona.hack4krak.pl")
task_path = Path(__file__).parent.parent


def test_site_work():
    response = request.get("/")
    check_status_code(response, 200)


def test_can_access_flag():

    response = request.get("/flag")
    check_status_code(response, 200)
    flag_content = response.text.split("{")[1].split("}")[0]

    flag_hash = load_flag_hash(task_path)
    assert flag_hash is not None
    assert validate_flag_hash(flag_content, flag_hash)
