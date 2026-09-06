from pathlib import Path

from playwright.sync_api import expect

from components.navbar import Navbar
from pages.register_page import RegisterPage
from utils.config_loader import load_json
from utils.data_generator import generate_unique_email

ROOT_DIR = Path(__file__).parent.parent

REGISTER_DATA = load_json(ROOT_DIR / "data" / "register_data.json")


def test_user_can_register(page):
    register_page = RegisterPage(page)
    navbar = Navbar(page)

    user_data = REGISTER_DATA["user"]
    email = generate_unique_email()

    register_page.open()
    register_page.register(
        name=user_data["name"],
        email=email,
        password=user_data["password"],
    )

    expected_first_name = user_data["name"].split()[0]

    expect(navbar.user_name).to_have_text(f"Kia ora, {expected_first_name}")
    expect(navbar.logout_button).to_be_visible()
