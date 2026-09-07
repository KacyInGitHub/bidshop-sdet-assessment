from playwright.sync_api import Page


class CartPage:
    def __init__(self, page: Page):
        self.page = page

    def get_product_row(self, product_name: str):
        return self.page.locator("tr").filter(has_text=product_name)

    def get_product_name(self, product_name: str):
        product_row = self.get_product_row(product_name)
        return product_row.locator("[data-testid^='cart-name-']")

    def get_product_quantity(self, product_name: str):
        product_row = self.get_product_row(product_name)
        return product_row.locator("[data-testid^='cart-qty-']")

    def continue_to_checkout(self):
        self.page.get_by_test_id("cart-checkout").click()
