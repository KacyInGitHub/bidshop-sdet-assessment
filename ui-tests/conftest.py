import json
import os
from pathlib import Path

import pytest

ROOT_DIR = Path(__file__).parent


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as file:
        return json.load(file)


SETTINGS = load_json(ROOT_DIR / "config" / "settings.json")


@pytest.fixture(scope="session")
def base_url():
    return os.getenv("BASE_URL", SETTINGS["base_url"])
