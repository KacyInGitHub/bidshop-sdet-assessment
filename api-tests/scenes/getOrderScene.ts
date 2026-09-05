import { OrdersApi, Order } from '../api/ordersApi';

import { TestContext, getDynamicData, setDynamicData } from '../context/testContext';

import { Scene } from './scene';

type GetOrderApis = {
  orders: OrdersApi;
};

export class GetOrderScene implements Scene{
  static readonly key = 'getOrder';
  static readonly apis = ['orders'] as const;
  constructor(
    private readonly apis: GetOrderApis,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const token = getDynamicData<string>(this.context, 'user.token');
    const orderId = getDynamicData<string>(this.context, 'order.id');
    const response = await this.apis.orders.getOrderById(token, orderId);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get order. Status: ${response.status()}`
      );
    }

    const order = await response.json() as Order;

    setDynamicData(this.context, 'order.latest', order);
  }
}