from toolbox.utils.test_utils import RequestHelper

request = RequestHelper(default_host="obwodnica-zabierzowa.hack4krak.pl")


def test_home_page_loads() -> None:
    request.get("/").raise_for_status()
