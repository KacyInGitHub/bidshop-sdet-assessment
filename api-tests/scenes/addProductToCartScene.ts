import {
  CartApi,
  AddCartItemRequest,
  Cart
} from '../api/cartApi';

import {
  PurchaseContext
} from '../context/purchaseContext';


export class AddProductToCartScene {
  constructor(
    private readonly cartApi: CartApi
  ) {}

  async addProductToCart(
    context: PurchaseContext
  ): Promise<Cart> {

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

    const requestBody: AddCartItemRequest = {
      productId: context.product.id,
      quantity: context.product.quantity
    };

    const response =
      await this.cartApi.addItem(
        context.user.token,
        requestBody
      );

    if (response.status() !== 201) {
      throw new Error(
        `Failed to add product to cart. Status: ${response.status()}`
      );
    }

    return await response.json() as Cart;
  }
}