import {
  OrdersApi,
  Order
} from '../api/ordersApi';

import {
  TestContext
} from '../context/testContext';

export class GetOrderScene {
  constructor(
    private readonly ordersApi: OrdersApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const token =
      this.context.user.token;

    const orderId =
      this.context.order.id;

    if (!token) {
      throw new Error(
        'User token is missing from test context'
      );
    }

    if (!orderId) {
      throw new Error(
        'Order ID is missing from test context'
      );
    }

    const response =
      await this.ordersApi.getOrderById(
        token,
        orderId
      );

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get order. Status: ${response.status()}`
      );
    }

    this.context.order.latest =
      await response.json() as Order;
  }
}