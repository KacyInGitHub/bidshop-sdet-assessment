import json
import os
from pathlib import Path

import pytest

ROOT_DIR = Path(__file__).parent

def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as file:
        return json.load(file)


SETTINGS = load_json(ROOT_DIR / "config" / "settings.json")

MARKETS = load_json(ROOT_DIR / "config" / "markets.json")

def pytest_addoption(parser):
    parser.addoption(
        "--market",
        action="store",
        default="nz-auckland",
        help="Market to run UI tests against",
    )

@pytest.fixture(scope="session")
def base_url():
    return os.getenv(
        "BASE_URL",
        SETTINGS["base_url"]
    )

@pytest.fixture
def market(request):
    market_name = request.config.getoption("--market")

    if market_name not in MARKETS:
        raise ValueError(
            f"Unknown market: {market_name}. "
            f"Available markets: {', '.join(MARKETS.keys())}"
        )

    return MARKETS[market_name]