import { expect } from "@playwright/test";

import { Order } from "../api/ordersApi";
import { Product } from "../api/productsApi";

import {
  TestContext,
  getDynamicData,
  getStaticData,
} from "../context/testContext";

import { Scene } from "./scene";

export class VerifyOrderScene implements Scene {
  static readonly key = "verifyOrder";

  constructor(private readonly context: TestContext) {}

  async run(): Promise<void> {
    const order = getDynamicData<Order>(this.context, "order.latest");

    const orderId = getDynamicData<string>(this.context, "order.id");

    const product = getDynamicData<Product>(this.context, "product.selected");

    const quantity = getStaticData<number>(this.context, "product.quantity");

    const expectedEmail = getDynamicData<string>(this.context, "user.email");

    expect(order.id).toBe(orderId);

    expect(order.customer.email).toBe(expectedEmail);

    expect(order.items).toHaveLength(1);

    const orderItem = order.items[0];

    expect(orderItem.productId).toBe(product.id);

    expect(orderItem.quantity).toBe(quantity);

    expect(order.subtotal).toBeCloseTo(product.price * quantity, 2);

    expect(order.createdAt).toBeTruthy();
  }
}
