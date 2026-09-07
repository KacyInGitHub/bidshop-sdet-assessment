import os
from pathlib import Path

import pytest

from utils.config_loader import load_json

ROOT_DIR = Path(__file__).parent
CONFIG_DIR = ROOT_DIR / "config"


def pytest_addoption(parser):
    """Add framework-specific command-line options."""
    parser.addoption(
        "--env",
        action="store",
        default="local",
        help="Test environment, e.g. local, test, staging",
    )


@pytest.fixture(scope="session")
def settings(request):
    """
    Load the configuration for the selected test environment.

    The --env option determines which JSON file is loaded.
    For example, --env=local loads config/local.json.
    """
    env = request.config.getoption("--env")
    config_path = CONFIG_DIR / f"{env}.json"

    if not config_path.exists():
        raise pytest.UsageError(
            f'Configuration file for environment "{env}" was not found: '
            f"{config_path}"
        )

    return load_json(config_path)


@pytest.fixture(scope="session")
def base_url(settings):
    """
    Provide the application base URL.

    BASE_URL can override the environment configuration, which is useful
    for CI pipelines or temporary test deployments.
    """
    return os.getenv("BASE_URL", settings["base_url"])


@pytest.fixture(autouse=True)
def configure_page(page, settings):
    """
    Apply the configured Playwright timeout to each test page.

    Playwright actions use auto-waiting, so this value defines the maximum
    waiting time rather than a fixed delay.
    """
    page.set_default_timeout(settings["default_timeout"])
