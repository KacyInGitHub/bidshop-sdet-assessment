import {
  ProductsApi,
  ProductList
} from '../api/productsApi';

import {
  TestContext
} from '../context/testContext';

export class FindAvailableProductScene {
  constructor(
    private readonly productsApi: ProductsApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {

    const response =
      await this.productsApi.getProducts({
        inStock: true
      });

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get products. Status: ${response.status()}`
      );
    }

    const body =
      await response.json() as ProductList;

    const product =
      body.items.find(
        item =>
          item.stock >=
          this.context.product.quantity
      );

    if (!product) {
      throw new Error(
        `No product has enough stock for quantity ${this.context.product.quantity}`
      );
    }

    this.context.product.id =
      product.id;

    this.context.product.name =
      product.name;

    this.context.product.price =
      product.price;

    this.context.product.originalStock =
      product.stock;
  }
}