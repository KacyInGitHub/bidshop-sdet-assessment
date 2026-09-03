import {
  CartApi,
  Cart
} from '../api/cartApi';

import {
  PurchaseContext
} from '../context/purchaseContext';

export class GetCartScene {
  constructor(
    private readonly cartApi: CartApi
  ) {}

  async getCart(
    context: PurchaseContext
  ): Promise<Cart> {

    if (!context.user.token) {
      throw new Error(
        'User token is missing from purchase context'
      );
    }

    const response = await this.cartApi.getCart(context.user.token);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get cart. Status: ${response.status()}`
      );
    }

    return await response.json() as Cart;
  }
}