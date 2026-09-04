import {
  CartApi,
  Cart
} from '../api/cartApi';

import {
  TestContext,
  getDynamicData,
  setDynamicData
} from '../context/testContext';

import {
  PurchaseFlowData
} from '../data/purchaseFlowData';

export class GetCartScene {
  constructor( 
    private readonly cartApi: CartApi,
    private readonly context:
      TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    const token = getDynamicData<string>(this.context, 'user.token');

    const response = await this.cartApi.getCart(token);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get cart. Status: ${response.status()}`
      );
    }

    const cart = await response.json() as Cart;

    setDynamicData(this.context, 'cart.latest', cart);
  }
}