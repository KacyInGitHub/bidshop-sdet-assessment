from playwright.sync_api import Page


class Navbar:
    def __init__(self, page: Page):
        self.page = page

        self.user_name = page.get_by_test_id("nav-user-name")
        self.logout_button = page.get_by_test_id("nav-logout")

    def get_user_name(self) -> str:
        return self.user_name.inner_text()

    def logout(self) -> None:
        self.logout_button.click()