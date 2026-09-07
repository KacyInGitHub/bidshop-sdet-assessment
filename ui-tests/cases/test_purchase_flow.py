from pathlib import Path

from playwright.sync_api import expect

from components.navbar import Navbar
from pages.cart_page import CartPage
from pages.checkout_page import CheckoutPage
from pages.products_page import ProductsPage
from pages.register_page import RegisterPage
from utils.config_loader import load_json
from utils.data_generator import generate_unique_email

ROOT_DIR = Path(__file__).parent.parent

PURCHASE_DATA = load_json(ROOT_DIR / "data" / "purchase_flow_data.json")


def test_user_can_complete_purchase(page):
    register_page = RegisterPage(page)
    products_page = ProductsPage(page)
    cart_page = CartPage(page)
    checkout_page = CheckoutPage(page)
    navbar = Navbar(page)

    user_data = PURCHASE_DATA["user"]
    product_data = PURCHASE_DATA["product"]
    delivery_data = PURCHASE_DATA["delivery"]

    email = generate_unique_email()

    # 1.Register a new customer.
    register_page.open()
    register_page.register(
        name=user_data["name"],
        email=email,
        password=user_data["password"],
    )

    expected_first_name = user_data["name"].split()[0]

    expect(navbar.user_name).to_have_text(f"Kia ora, {expected_first_name}")
    expect(navbar.logout_button).to_be_visible()

    # 2.Find the product and add it to the cart.
    products_page.search(product_data["keyword"])

    expect(products_page.get_product_name(product_data["name"])).to_be_visible()

    products_page.add_product_to_cart(product_data["name"])

    # 3.Open the cart and verify the selected product.
    navbar.open_cart()

    expect(cart_page.get_product_name(product_data["name"])).to_have_text(
        product_data["name"]
    )

    expect(cart_page.get_product_quantity(product_data["name"])).to_have_value(
        str(product_data["quantity"])
    )

    # 4.Continue to checkout.
    cart_page.continue_to_checkout()

    expect(checkout_page.page_title).to_be_visible()

    # Verify that the registered user information is carried into checkout.
    expect(checkout_page.full_name).to_have_value(user_data["name"])
    expect(checkout_page.email).to_have_value(email)

    # Verify that the selected product is shown in the order summary.
    expect(checkout_page.get_order_product(product_data["name"])).to_be_visible()

    # 5.Complete delivery details and place the order.
    checkout_page.fill_delivery_details(
        street_address=delivery_data["address"],
        city=delivery_data["city"],
        postcode=delivery_data["postcode"],
    )

    expect(checkout_page.submit_button).to_be_visible()

    checkout_page.place_order()

    # Verify that the order was successfully created.
    expect(checkout_page.order_confirmation).to_contain_text("has been placed")
    expect(checkout_page.order_id).to_be_visible()
    expect(checkout_page.order_total).to_be_visible()
