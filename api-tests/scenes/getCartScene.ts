import {
  CartApi,
  Cart
} from '../api/cartApi';

import {
  TestContext
} from '../context/testContext';

export class GetCartScene {
  constructor(
    private readonly cartApi: CartApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const token = this.context.user.token;

    if (!token) {
      throw new Error(
        'User token is missing from test context'
      );
    }

    const response =
      await this.cartApi.getCart(token);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get cart. Status: ${response.status()}`
      );
    }

    this.context.cart.latest =
      await response.json() as Cart;
  }
}