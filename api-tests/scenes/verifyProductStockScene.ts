import { expect } from "@playwright/test";

import { Product } from "../api/productsApi";

import {
  TestContext,
  getDynamicData,
  getStaticData,
} from "../context/testContext";

import { Scene } from "./scene";

export class VerifyProductStockScene implements Scene {
  static readonly key = "verifyProductStock";

  constructor(private readonly context: TestContext) {}

  async run(): Promise<void> {
    const originalProduct = getDynamicData<Product>(
      this.context,
      "product.selected",
    );

    const latestProduct = getDynamicData<Product>(
      this.context,
      "product.latest",
    );

    const quantity = getStaticData<number>(this.context, "product.quantity");

    expect(latestProduct.id).toBe(originalProduct.id);

    expect(latestProduct.stock).toBe(originalProduct.stock - quantity);
  }
}
