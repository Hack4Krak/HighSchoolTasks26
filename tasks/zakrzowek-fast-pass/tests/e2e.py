import pytest

from toolbox.utils.test_utils import RequestHelper, check_status_code, check_text_contains

request = RequestHelper(default_host="zakrzowek-fast-pass.hack4krak.pl", default_timeout=20.0)

MODEL_ID = "zakrzowek-kolejka:latest"
TEST_EMAIL = "test-e2e@zakrzowek.local"
TEST_PASSWORD = "plusk-plusk-2026"
ADMIN_EMAIL = "zakrzowek-admin@localhost"
ADMIN_PASSWORD = "8bKp6KpJDQv6aV5b2XqP4sWm"


def login_or_create_participant() -> tuple[str, str]:
    response = request.post(
        "/api/v1/auths/signin",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    if response.status_code == 200:
        data = response.json()
        assert data["role"] == "user"
        assert data["email"] == TEST_EMAIL
        assert data["token"]
        return TEST_EMAIL, data["token"]

    admin_login = request.post(
        "/api/v1/auths/signin",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
    )
    check_status_code(admin_login, 200)
    admin_token = admin_login.json()["token"]

    request.post(
        "/api/v1/auths/add",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={"name": "E2E Uczestnik", "email": TEST_EMAIL, "password": TEST_PASSWORD, "role": "user"},
    )

    response = request.post(
        "/api/v1/auths/signin",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    check_status_code(response, 200)

    data = response.json()
    assert data["role"] == "user"
    assert data["email"] == TEST_EMAIL
    assert data["token"]
    return TEST_EMAIL, data["token"]


@pytest.mark.timeout(30)
def test_open_webui_page_loads():
    response = request.get("/")
    check_status_code(response, 200)
    check_text_contains(response, "Open WebUI")


@pytest.mark.timeout(30)
def test_participant_can_create_custom_account_and_log_in():
    email, _ = login_or_create_participant()

    response = request.post(
        "/api/v1/auths/signin",
        json={"email": email, "password": TEST_PASSWORD},
    )
    check_status_code(response, 200)

    data = response.json()
    assert data["role"] == "user"
    assert data["email"] == email
    assert data["token"]


@pytest.mark.timeout(30)
def test_participant_can_access_zakrzowek_model():
    _, token = login_or_create_participant()

    response = request.get("/api/models", headers={"Authorization": f"Bearer {token}"})
    check_status_code(response, 200)

    model_ids = {model["id"] for model in response.json()["data"]}
    assert MODEL_ID in model_ids
