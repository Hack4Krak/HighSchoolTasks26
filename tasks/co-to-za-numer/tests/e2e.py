from pathlib import Path

from toolbox.utils.test_utils import RequestHelper, check_status_code

request = RequestHelper(default_host="co-to-za-numer.hack4krak.pl")
task_path = Path(__file__).parent.parent


def test_health():
    response = request.get("/api/health")
    check_status_code(response, 200)
    assert response.json() == {"ok": True}


def test_search():
    response = request.get("/api/search")
    check_status_code(response, 200)
    assert isinstance(response.json(), list)


def test_day_unknown():
    response = request.get("/api/day/999999")
    check_status_code(response, 404)


def test_guess_missing_body():
    response = request.post("/api/guess")
    assert response.status_code in (422, 400)


def test_spa_serves_index():
    response = request.get("/")
    check_status_code(response, 200)
    assert "text/html" in response.headers.get("content-type", "")


def test_spa_catches_unknown_frontend_route():
    response = request.get("/day/1")
    check_status_code(response, 200)
    assert "text/html" in response.headers.get("content-type", "")
