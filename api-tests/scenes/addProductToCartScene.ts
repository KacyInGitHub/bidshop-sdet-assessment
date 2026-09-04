import {
  CartApi,
  AddCartItemRequest,
  Cart
} from '../api/cartApi';

import {
  TestContext
} from '../context/testContext';


export class AddProductToCartScene {
  constructor(
    private readonly cartApi: CartApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    if (!this.context.user.token) {
      throw new Error(
        'User token is missing from test context'
      );
    }

    if (!this.context.product.id) {
      throw new Error(
        'Product ID is missing from test context'
      );
    }

    const requestBody: AddCartItemRequest = {
      productId: this.context.product.id,
      quantity: this.context.product.quantity
    };

    const response =
      await this.cartApi.addItem(
        this.context.user.token,
        requestBody
      );

    if (response.status() !== 201) {
      throw new Error(
        `Failed to add product to cart. Status: ${response.status()}`
      );
    }

    this.context.cart.latest =
      await response.json() as Cart;
  }
}