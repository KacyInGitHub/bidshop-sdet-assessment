import {
  ProductsApi,
  Product
} from '../api/productsApi';

import {
  TestContext,
  getDynamicData,
  setDynamicData
} from '../context/testContext';

import { Scene } from './scene';

export class GetProductScene implements Scene{
  static readonly key = 'getProduct';
  static readonly api = ['products'] as const;

  constructor(
    private readonly productsApi: ProductsApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const selectedProduct = getDynamicData<Product>(this.context, 'product.selected');

    const response = await this.productsApi.getProductById(selectedProduct.id);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get product. Status: ${response.status()}`
      );
    }

    const product = await response.json() as Product;

    setDynamicData(this.context, 'product.latest', product);
  }
}