import {
  OrdersApi,
  CreateOrderRequest,
  Order
} from '../api/ordersApi';

import {
  TestContext,
  getDynamicData,
  setDynamicData
} from '../context/testContext';

import {
  PurchaseFlowData
} from '../data/purchaseFlowData';
import { Scene } from './scene';

export class PlaceOrderScene implements Scene{
  static readonly key = 'placeOrder';
  static readonly api = 'orders';

  constructor(
    private readonly ordersApi: OrdersApi,

    private readonly context: TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    const token = getDynamicData<string>(this.context, 'user.token');

    const email = getDynamicData<string>(this.context, 'user.email');

    const customer = this.context.staticData.order.customer;

    const requestBody: CreateOrderRequest = {
      customer: {
        name: customer.name,
        email,
        address: customer.address,
        city: customer.city,
        postcode: customer.postcode
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