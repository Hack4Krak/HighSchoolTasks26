import pytest
import requests

TOR_PROXY = {
    "http":  "socks5h://127.0.0.1:9050",
    "https": "socks5h://127.0.0.1:9050",
}

ONION_URL = "http://qzr7oadrw6tlzlpodlf27wau63h5kn2znbjgs5t5qvcavsgoyiteuvad.onion"

def test_onion_service_is_reachable():
    try:
        response = requests.get(ONION_URL, proxies=TOR_PROXY, timeout=30)
        assert response.status_code < 500, f"Serwis zwrócił błąd serwera: {response.status_code}"
    except requests.exceptions.ConnectionError:
        pytest.fail("Nie można połączyć się z serwisem .onion")
    except requests.exceptions.Timeout:
        pytest.fail("Timeout – serwis nie odpowiedział w ciągu 30s")