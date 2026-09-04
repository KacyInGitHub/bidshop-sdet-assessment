import { CartApi, AddCartItemRequest, Cart } from '../api/cartApi';

import { Product } from '../api/productsApi';

import {TestContext, getDynamicData, setDynamicData } from '../context/testContext';

import { PurchaseFlowData } from '../data/purchaseFlowData';
import { Scene } from './scene';

export class AddProductToCartScene implements Scene{
  static readonly key = 'addProductToCart';
  static readonly api = 'cart';
  
  constructor(
    private readonly cartApi: CartApi,
    private readonly context: TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    const token = getDynamicData<string>(this.context, 'user.token');

    const product = getDynamicData<Product>(this.context, 'product.selected');

    const requestBody: AddCartItemRequest = {
      productId: product.id,
      quantity: this.context.staticData.product.quantity
    };

    const response = await this.cartApi.addItem(token, requestBody);

    if (response.status() !== 201) {
      throw new Error(
        `Failed to add product to cart. Status: ${response.status()}`
      );
    }

    const cart = await response.json() as Cart;

    setDynamicData(this.context, 'cart.latest', cart);
  }
}