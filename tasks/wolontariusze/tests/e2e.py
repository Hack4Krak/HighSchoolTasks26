from pathlib import Path

from toolbox.utils.test_utils import RequestHelper, load_flag_hash, validate_flag_hash

task_path = Path(__file__).parent.parent

request = RequestHelper(default_host="wolontariusze.hack4krak.pl")


def test_server_responds_flag():
    response = request.post(
        "/submit",
        json={
            "pleaseNoWebhook": True,
            "total": 100,
        },
        headers={"Content-Type": "application/json"},
    )
    expected_hash = load_flag_hash(task_path)
    flag_content = response.text.split("{")[1].split("}")[0]

    assert expected_hash is not None
    assert validate_flag_hash(flag_content, expected_hash)


def test_server_gives_no_flag_no_teapot():
    response = request.post(
        "/submit",
        json={
            "pleaseNoWebhook": True,
            "total": 5,
        },
        headers={"Content-Type": "application/json"},
    )

    assert "hack4KrakCTF" not in response.text
    assert response.ok
