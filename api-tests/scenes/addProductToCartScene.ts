import { CartApi, AddCartItemRequest, Cart } from "../api/cartApi";
import { Product } from "../api/productsApi";
import {
  TestContext,
  getDynamicData,
  setDynamicData,
  getStaticData,
} from "../context/testContext";
import { Scene } from "./scene";

type AddProductToCartApis = {
  cart: CartApi;
};

export class AddProductToCartScene implements Scene {
  static readonly key = "addProductToCart";
  static readonly apis = ["cart"] as const;

  constructor(
    private readonly apis: AddProductToCartApis,
    private readonly context: TestContext,
  ) {}

  async run(): Promise<void> {
    const token = getDynamicData<string>(this.context, "user.token");

    const product = getDynamicData<Product>(this.context, "product.selected");

    const requestBody: AddCartItemRequest = {
      productId: product.id,
      quantity: getStaticData<number>(this.context, "product.quantity"),
    };

    const response = await this.apis.cart.addItem(token, requestBody);

    if (response.status() !== 201) {
      throw new Error(
        `Failed to add product to cart. Status: ${response.status()}`,
      );
    }

    const cart = (await response.json()) as Cart;

    setDynamicData(this.context, "cart.latest", cart);
  }
}
