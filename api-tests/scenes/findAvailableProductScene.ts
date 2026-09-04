import {
  ProductsApi,
  ProductList
} from '../api/productsApi';

import {
  TestContext,
  setDynamicData
} from '../context/testContext';

import {
  PurchaseFlowData
} from '../data/purchaseFlowData';
import { Scene } from './scene';

export class FindAvailableProductScene implements Scene{
  static readonly key = 'findAvailableProduct';
  static readonly api = 'products';

  constructor(
    private readonly productsApi: ProductsApi,

    private readonly context: TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    const response = await this.productsApi.getProducts({ inStock: true });

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get products. Status: ${response.status()}`
      );
    }

    const body = await response.json() as ProductList;

    const quantity = this.context.staticData.product.quantity;

    const product = body.items.find(item => item.stock >= quantity);

    if (!product) {
      throw new Error(
        `No product has enough stock for quantity ${quantity}`
      );
    }

    setDynamicData(this.context, 'product.selected', product);
  }
}