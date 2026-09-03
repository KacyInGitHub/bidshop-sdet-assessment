import {
  APIRequestContext,
  APIResponse
} from '@playwright/test';


// ---------- Request Types ----------

export interface AddCartItemRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}


// ---------- Response Types ----------

export interface CartLine {
  productId: string;
  quantity: number;
  name: string;
  unit: string;
  unitPrice: number;
  lineTotal: number;
  imageUrl?: string;
}

export interface Cart {
  userId: string;
  items: CartLine[];
  subtotal: number;
  gst: number;
  total: number;
  updatedAt: string;
}


// ---------- API ----------

export class CartApi {
  constructor(
    private readonly request: APIRequestContext
  ) {}

  async getCart(
    token: string
  ): Promise<APIResponse> {
    return this.request.get('/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async clearCart(
    token: string
  ): Promise<APIResponse> {
    return this.request.delete('/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async addItem(
    token: string,
    requestBody: AddCartItemRequest
  ): Promise<APIResponse> {
    return this.request.post('/cart/items', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: requestBody
    });
  }

  async updateItem(
    token: string,
    productId: string,
    requestBody: UpdateCartItemRequest
  ): Promise<APIResponse> {
    return this.request.patch(
      `/cart/items/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: requestBody
      }
    );
  }

  async removeItem(
    token: string,
    productId: string
  ): Promise<APIResponse> {
    return this.request.delete(
      `/cart/items/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}