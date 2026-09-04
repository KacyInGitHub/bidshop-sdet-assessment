import {
  OrdersApi,
  CreateOrderRequest,
  Order
} from '../api/ordersApi';

import {
  TestContext
} from '../context/testContext';

export class PlaceOrderScene {
  constructor(
    private readonly ordersApi: OrdersApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const token =
      this.context.user.token;

    const email =
      this.context.user.email;

    if (!token) {
      throw new Error(
        'User token is missing from test context'
      );
    }

    if (!email) {
      throw new Error(
        'User email is missing from test context'
      );
    }

    const requestBody: CreateOrderRequest = {
      customer: {
        name:
          this.context.order.customer.name,

        email,

        address:
          this.context.order.customer.address,

        city:
          this.context.order.customer.city,

        postcode:
          this.context.order.customer.postcode
      }
    };

    const response =
      await this.ordersApi.createOrder(
        token,
        requestBody
      );

    if (response.status() !== 201) {
      throw new Error(
        `Failed to place order. Status: ${response.status()}`
      );
    }

    const body =
      await response.json() as Order;

    this.context.order.id =
      body.id;

    this.context.order.latest =
      body;

    this.context.order.customer.email =
      body.customer.email;
  }
}