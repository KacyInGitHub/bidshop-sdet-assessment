import {
  OrdersApi,
  Order
} from '../api/ordersApi';

import {
  TestContext
} from '../context/testContext';

export class GetOrderScene {
  constructor(
    private readonly ordersApi: OrdersApi
  ) {}

  async getOrder(
    context: TestContext
  ): Promise<Order> {

    if (!context.user.token) {
      throw new Error(
        'User token is missing from purchase context'
      );
    }

    if (!context.order.id) {
      throw new Error(
        'Order ID is missing from purchase context'
      );
    }

    const response = await this.ordersApi.getOrderById(context.user.token, context.order.id);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get order. Status: ${response.status()}`
      );
    }

    return await response.json() as Order;
  }
}