import {
  ProductsApi,
  ProductList
} from '../api/productsApi';

import {
  PurchaseContext
} from '../context/purchaseContext';

export class FindAvailableProductScene {
  constructor(
    private readonly productsApi: ProductsApi
  ) {}

  async findAvailableProduct(
    context: PurchaseContext
  ): Promise<void> {

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

    const product = body.items.find(
      item => item.stock >= context.product.quantity
    );

    if (!product) {
      throw new Error(
        `No product has enough stock for quantity ${context.product.quantity}`
      );
    }

    context.product.id = product.id;
    context.product.name = product.name;
    context.product.price = product.price;
    context.product.originalStock = product.stock;
  }
}