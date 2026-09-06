from playwright.sync_api import Page


class RegisterPage:
    PATH = "/register"

    def __init__(self, page: Page):
        self.page = page

        self.name_input = page.get_by_test_id("register-name")
        self.email_input = page.get_by_test_id("register-email")
        self.password_input = page.get_by_test_id("register-password")
        self.submit_button = page.get_by_test_id("register-submit")

    def open(self) -> None:
        self.page.goto(self.PATH)

    def register(self, name: str, email: str, password: str) -> None:
        self.name_input.fill(name)
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.submit_button.click()
