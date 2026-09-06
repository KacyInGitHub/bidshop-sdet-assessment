import { expect } from "@playwright/test";

import { Product } from "../api/productsApi";

import {
  TestContext,
  getStaticData,
  getDynamicData,
} from "../context/testContext";

import { Scene } from "./scene";

export class VerifyAvailableProductScene implements Scene {
  static readonly key = "verifyAvailableProduct";

  constructor(private readonly context: TestContext) {}

  async run(): Promise<void> {
    const product = getDynamicData<Product>(this.context, "product.selected");

    const quantity = getStaticData<number>(this.context, "product.quantity");

    expect(product.id).toBeTruthy();

    expect(product.name).toBeTruthy();

    expect(product.price).toBeGreaterThan(0);

    expect(product.stock).toBeGreaterThanOrEqual(quantity);
  }
}
