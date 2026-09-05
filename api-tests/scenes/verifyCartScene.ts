import { expect } from '@playwright/test';

import { Cart } from '../api/cartApi';
import { Product } from '../api/productsApi';

import {
  TestContext,
  getDynamicData,
  getStaticData
} from '../context/testContext';

import { Scene } from './scene';


export class VerifyCartScene
  implements Scene {

  static readonly key = 'verifyCart';


  constructor(
    private readonly context: TestContext
  ) {}


  async run(): Promise<void> {

    const cart =
      getDynamicData<Cart>(
        this.context,
        'cart.latest'
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


    expect(cart.items).toHaveLength(1);


    const cartItem = cart.items[0];


    expect(cartItem.productId)
      .toBe(product.id);

    expect(cartItem.name)
      .toBe(product.name);

    expect(cartItem.quantity)
      .toBe(quantity);

    expect(cartItem.unitPrice)
      .toBe(product.price);

    expect(cartItem.lineTotal)
      .toBeCloseTo(
        product.price * quantity,
        2
      );


    expect(cart.subtotal)
      .toBeCloseTo(
        product.price * quantity,
        2
      );


    expect(cart.total)
      .toBeCloseTo(
        cart.subtotal + cart.gst,
        2
      );
  }
}