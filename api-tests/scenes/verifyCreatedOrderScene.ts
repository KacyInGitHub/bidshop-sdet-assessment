import { expect } from '@playwright/test';

import { Order } from '../api/ordersApi';
import { Product } from '../api/productsApi';

import {
  TestContext,
  getDynamicData,
  getStaticData
} from '../context/testContext';

import { Scene } from './scene';


export class VerifyCreatedOrderScene
  implements Scene {

  static readonly key =
    'verifyCreatedOrder';


  constructor(
    private readonly context: TestContext
  ) {}


  async run(): Promise<void> {

    const order =
      getDynamicData<Order>(
        this.context,
        'order.latest'
      );

    const orderId =
      getDynamicData<string>(
        this.context,
        'order.id'
      );

    const product =
      getDynamicData<Product>(
        this.context,
        'product.selected'
      );

    const quantity =
      getStaticData<number>(
        this.context,
        'product.quantity'
      );

    const expectedEmail =
      getDynamicData<string>(
        this.context,
        'user.requestedEmail'
      );


    const expectedName =
      getStaticData<string>(
        this.context,
        'order.customer.name'
      );

    const expectedAddress =
      getStaticData<string>(
        this.context,
        'order.customer.address'
      );

    const expectedCity =
      getStaticData<string>(
        this.context,
        'order.customer.city'
      );

    const expectedPostcode =
      getStaticData<string>(
        this.context,
        'order.customer.postcode'
      );


    expect(order.id).toBeTruthy();

    expect(order.id)
      .toBe(orderId);


    expect(order.customer.name)
      .toBe(expectedName);

    expect(order.customer.email)
      .toBe(expectedEmail);

    expect(order.customer.address)
      .toBe(expectedAddress);

    expect(order.customer.city)
      .toBe(expectedCity);

    expect(order.customer.postcode)
      .toBe(expectedPostcode);


    expect(order.items).toHaveLength(1);


    const orderItem = order.items[0];


    expect(orderItem.productId)
      .toBe(product.id);

    expect(orderItem.quantity)
      .toBe(quantity);

    expect(orderItem.unitPrice)
      .toBe(product.price);

    expect(orderItem.lineTotal)
      .toBeCloseTo(
        product.price * quantity,
        2
      );


    expect(order.subtotal)
      .toBeCloseTo(
        product.price * quantity,
        2
      );

    expect(order.total)
      .toBeGreaterThan(order.subtotal);

    expect(order.createdAt)
      .toBeTruthy();
  }
}