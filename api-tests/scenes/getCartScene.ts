import { CartApi, Cart } from '../api/cartApi';
import { TestContext, getDynamicData, setDynamicData } from '../context/testContext';
import { Scene } from './scene';

type GetCartApis = {
  cart: CartApi;
};

export class GetCartScene implements Scene{
  static readonly key = 'getCart';
  static readonly apis = ['cart'] as const;

  constructor( 
    private readonly apis: GetCartApis,
    private readonly context:TestContext
  ) {}

  async run(): Promise<void> {
    const token = getDynamicData<string>(this.context, 'user.token');

    const response = await this.apis.cart.getCart(token);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get cart. Status: ${response.status()}`
      );
    }

    const cart = await response.json() as Cart;

    setDynamicData(this.context, 'cart.latest', cart);
  }
}