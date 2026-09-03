import {
  OrdersApi,
  CreateOrderRequest,
  Order
} from '../api/ordersApi';

import {
  PurchaseContext
} from '../context/purchaseContext';

export class PlaceOrderScene {
  constructor(
    private readonly ordersApi: OrdersApi
  ) {}

  async placeOrder(
    context: PurchaseContext
  ): Promise<Order> {

    if (!context.user.token) {
      throw new Error(
        'User token is missing from purchase context'
      );
    }

    if (!context.user.email) {
      throw new Error(
        'User email is missing from purchase context'
      );
    }

    const requestBody: CreateOrderRequest = {
      customer: {
        name: context.order.customer.name,
        email: context.user.email,
        address: context.order.customer.address,
        city: context.order.customer.city,
        postcode: context.order.customer.postcode
      }
    };

    const response = await this.ordersApi.createOrder(context.user.token,requestBody);

    if (response.status() !== 201) {
      throw new Error(
        `Failed to place order. Status: ${response.status()}`
      );
    }

    const body = await response.json() as Order;

    context.order.id = body.id;
    context.order.customer.email = body.customer.email;

    return body;
  }
}