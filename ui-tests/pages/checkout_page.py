from playwright.sync_api import Page


class CheckoutPage:
    def __init__(self, page: Page):
        self.page = page

    @property
    def page_title(self):
        return self.page.get_by_role("heading", name="Checkout")

    @property
    def full_name(self):
        return self.page.get_by_test_id("checkout-name")

    @property
    def email(self):
        return self.page.get_by_test_id("checkout-email")

    @property
    def street_address(self):
        return self.page.get_by_test_id("checkout-address")

    @property
    def city(self):
        return self.page.get_by_test_id("checkout-city")

    @property
    def postcode(self):
        return self.page.get_by_test_id("checkout-postcode")

    @property
    def submit_button(self):
        return self.page.get_by_test_id("checkout-submit")

    @property
    def order_summary(self):
        return self.page.get_by_test_id("checkout-summary")

    @property
    def order_confirmation(self):
        return self.page.get_by_test_id("order-confirmation")

    @property
    def order_id(self):
        return self.page.get_by_test_id("order-id")

    @property
    def order_total(self):
        return self.page.get_by_test_id("order-total")

    def get_order_product(self, product_name: str):
        return self.order_summary.get_by_text(product_name, exact=False)

    def fill_delivery_details(
        self,
        street_address: str,
        city: str,
        postcode: str,
    ):
        self.street_address.fill(street_address)
        self.city.fill(city)
        self.postcode.fill(postcode)

    def place_order(self):
        self.submit_button.click()
