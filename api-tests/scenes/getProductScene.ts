import {
  ProductsApi,
  Product
} from '../api/productsApi';

import {
  PurchaseContext
} from '../context/purchaseContext';

export class GetProductScene {
  constructor(
    private readonly productsApi: ProductsApi
  ) {}

  async getSelectedProduct(
    context: PurchaseContext
  ): Promise<Product> {

    if (!context.product.id) {
      throw new Error(
        'Product ID is missing from purchase context'
      );
    }

    const response = await this.productsApi.getProductById(context.product.id);

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get product. Status: ${response.status()}`
      );
    }

    return await response.json() as Product;
  }
}