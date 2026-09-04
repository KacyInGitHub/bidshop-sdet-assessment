import {
  OrdersApi,
  CreateOrderRequest,
  Order
} from '../api/ordersApi';

import { TestContext, getDynamicData, setDynamicData, getStaticData } from '../context/testContext';

import { Scene } from './scene';

export class PlaceOrderScene implements Scene{
  static readonly key = 'placeOrder';
  static readonly api = ['orders'] as const;

  constructor(
    private readonly ordersApi: OrdersApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const token = getDynamicData<string>(this.context, 'user.token');

    const email = getDynamicData<string>(this.context, 'user.email');

    const name = getStaticData<string>(this.context, 'order.customer.name');

    const address =
      getStaticData<string>(
        this.context,
        'order.customer.address'
      );

    const city =
      getStaticData<string>(
        this.context,
        'order.customer.city'
      );

    const postcode =
      getStaticData<string>(
        this.context,
        'order.customer.postcode'
      );

    const requestBody:
      CreateOrderRequest = {
        customer: {
          name,
          email,
          address,
          city,
          postcode
        }
      };

    const response = await this.ordersApi.createOrder(token, requestBody);

    if (response.status() !== 201) {
      throw new Error(
        `Failed to place order. Status: ${response.status()}`
      );
    }

    const order = await response.json() as Order;

    setDynamicData(this.context, 'order.id', order.id);
    setDynamicData(this.context, 'order.latest', order);
  }
}