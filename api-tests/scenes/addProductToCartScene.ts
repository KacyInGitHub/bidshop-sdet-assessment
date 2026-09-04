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
    private readonly cartApi: CartApi
  ) {}

  async run(
    context: TestContext
  ): Promise<void> {

    if (!context.user.token) {
      throw new Error(
        'User token is missing from purchase context'
      );
    }

    if (!context.product.id) {
      throw new Error(
        'Product ID is missing from purchase context'
      );
    }

    const response =
      await this.cartApi.addItem(
        context.user.token,
        {
          productId: context.product.id,
          quantity: context.product.quantity
        }
      );

    if (response.status() !== 201) {
      throw new Error(
        `Failed to add product to cart. Status: ${response.status()}`
      );
    }

    context.cart.latest =
      await response.json() as Cart;
  }
}