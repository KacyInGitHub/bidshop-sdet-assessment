import {
  APIRequestContext,
  APIResponse
} from '@playwright/test';


// ---------- Response Types ----------

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  imageUrl?: string;
}

export interface ProductList {
  count: number;
  items: Product[];
}


// ---------- API ----------

export class ProductsApi {
  constructor(
    private readonly request: APIRequestContext
  ) {}

  async getProducts( query?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return this.request.get('/products', { params: query });
  }

  async getCategories(): Promise<APIResponse> {
    return this.request.get('/products/categories');
  }

  async getProductById( productId: string ): Promise<APIResponse> {
    return this.request.get(`/products/${productId}`);
  }
}