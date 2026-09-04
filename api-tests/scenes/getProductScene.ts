import {
  ProductsApi,
  Product
} from '../api/productsApi';

import {
  TestContext,
  getDynamicData,
  setDynamicData
} from '../context/testContext';

import {
  PurchaseFlowData
} from '../data/purchaseFlowData';

export class GetProductScene {
  constructor(
    private readonly productsApi: ProductsApi,
    private readonly context: TestContext<PurchaseFlowData>
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