import { APIRequestContext, APIResponse } from "@playwright/test";

// ---------- Request Types ----------

export interface CreateOrderRequest {
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
  };
}

// ---------- Response Types ----------

export interface OrderItem {
  productId: string;
  quantity: number;
  name: string;
  unit: string;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  userId: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postcode: string;
  };
  items: OrderItem[];
  subtotal: number;
  gst: number;
  total: number;
  status: "PENDING" | "CONFIRMED";
  createdAt: string;
}

export class OrdersApi {
  constructor(private readonly request: APIRequestContext) {}

  async createOrder(
    token: string,
    requestBody: CreateOrderRequest,
  ): Promise<APIResponse> {
    return this.request.post("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: requestBody,
    });
  }

  async getOrders(token: string): Promise<APIResponse> {
    return this.request.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getOrderById(token: string, orderId: string): Promise<APIResponse> {
    return this.request.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
