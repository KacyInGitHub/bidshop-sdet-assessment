from playwright.sync_api import Page, Locator


class ProductsPage:
    PATH = "/"

    def __init__(self, page: Page):
        self.page = page

        self.search_input = page.get_by_test_id("filter-search")
        self.category_filter = page.get_by_test_id("filter-category")
        self.filter_summary = page.get_by_test_id("filter-summary")

    def open(self) -> None:
        self.page.goto(self.PATH)

    def search(self, keyword: str) -> None:
        self.search_input.fill(keyword)

    def select_category(self, category: str) -> None:
        self.category_filter.select_option(label=category)

    def get_product_card(self, product_id: str) -> Locator:
        return self.page.get_by_test_id(f"product-card-{product_id}")

    def get_product_name(self, product_name: str) -> Locator:
        return self.page.get_by_role("heading", name=product_name, exact=True)

    def get_filter_summary(self) -> Locator:
        return self.filter_summary
    
    def get_product_cards(self) -> Locator:
        return self.page.locator('[data-testid^="product-card-"]')

    def get_product_categories(self) -> Locator:
        return self.page.locator('[data-testid^="product-category-"]')

    def get_category_labels(self, category: str) -> Locator:
        return self.get_product_cards().get_by_text(category, exact=True)