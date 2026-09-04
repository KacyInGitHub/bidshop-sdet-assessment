import {
  ProductsApi,
  Product
} from '../api/productsApi';

import {
  TestContext
} from '../context/testContext';

export class GetProductScene {
  constructor(
    private readonly productsApi: ProductsApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const productId =
      this.context.product.id;

    if (!productId) {
      throw new Error(
        'Product ID is missing from test context'
      );
    }

    const response =
      await this.productsApi.getProductById(
        productId
      );

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get product. Status: ${response.status()}`
      );
    }

    this.context.product.latest =
      await response.json() as Product;
  }
}