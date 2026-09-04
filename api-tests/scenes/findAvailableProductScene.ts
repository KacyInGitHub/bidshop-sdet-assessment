import { ProductsApi, ProductList } from '../api/productsApi';
import { TestContext, setDynamicData, getStaticData } from '../context/testContext';
import { Scene } from './scene';

export class FindAvailableProductScene implements Scene{
  static readonly key = 'findAvailableProduct';
  static readonly api = 'products';

  constructor(
    private readonly productsApi: ProductsApi,

    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const response = await this.productsApi.getProducts({ inStock: true });

    if (response.status() !== 200) {
      throw new Error(
        `Failed to get products. Status: ${response.status()}`
      );
    }

    const body = await response.json() as ProductList;

    const quantity = getStaticData<number>(this.context, 'product.quantity');

    const product = body.items.find(item => item.stock >= quantity);

    if (!product) {
      throw new Error(
        `No product has enough stock for quantity ${quantity}`
      );
    }

    setDynamicData(this.context, 'product.selected', product);
  }
}