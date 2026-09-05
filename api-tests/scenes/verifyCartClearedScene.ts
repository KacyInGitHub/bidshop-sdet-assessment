import { expect } from '@playwright/test';

import { Cart } from '../api/cartApi';

import {
  TestContext,
  getDynamicData
} from '../context/testContext';

import { Scene } from './scene';


export class VerifyCartClearedScene
  implements Scene {

  static readonly key =
    'verifyCartCleared';


  constructor(
    private readonly context: TestContext
  ) {}


  async run(): Promise<void> {

    const cart =
      getDynamicData<Cart>(
        this.context,
        'cart.latest'
      );


    expect(cart.items)
      .toHaveLength(0);

    expect(cart.subtotal)
      .toBe(0);

    expect(cart.gst)
      .toBe(0);

    expect(cart.total)
      .toBe(0);
  }
}