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

type GetProductApis = {
  products: ProductsApi;
};

export class GetProductScene implements Scene{
  static readonly key = 'getProduct';
  static readonly apis = ['products'] as const;

  constructor(
    private readonly apis: GetProductApis,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const selectedProduct = getDynamicData<Product>(this.context, 'product.selected');

    const response = await this.apis.products.getProductById(selectedProduct.id);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get product. Status: ${response.status()}`
      );
    }

    const product = await response.json() as Product;

    setDynamicData(this.context, 'product.latest', product);
  }
}