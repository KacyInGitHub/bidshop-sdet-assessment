from pathlib import Path

from playwright.sync_api import expect

from pages.products_page import ProductsPage
from utils.config_loader import load_json

ROOT_DIR = Path(__file__).parent.parent

PRODUCT_DATA = load_json(ROOT_DIR / "data" / "product_data.json")


def test_user_can_search_products(page):
    products_page = ProductsPage(page)

    search_data = PRODUCT_DATA["search"]

    products_page.open()
    products_page.search(search_data["keyword"])

    expect(
        products_page.get_product_name(search_data["expected_product"])
    ).to_be_visible()

    expect(products_page.get_filter_summary()).to_have_text("1 product")


def test_user_can_filter_products_by_category(page):
    products_page = ProductsPage(page)

    category = PRODUCT_DATA["category_filter"]["category"]

    products_page.open()
    products_page.select_category(category)

    category_labels = products_page.get_product_categories()

    expect(category_labels.first).to_be_visible()

    categories = category_labels.all_inner_texts()

    assert categories
    assert all(item.strip().lower() == category.lower() for item in categories)
