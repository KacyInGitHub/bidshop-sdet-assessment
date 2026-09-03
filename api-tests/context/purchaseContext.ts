export interface PurchaseContext {
  user: {
    name: string;
    password: string;

    email?: string;
    id?: string;
    token?: string;
  };

  product: {
    quantity: number;

    id?: string;
    name?: string;
    price?: number;
    originalStock?: number;
  };

  order: {
    customer: {
      name: string;
      email?: string;
      address: string;
      city: string;
      postcode: string;
    };

    id?: string;
  };
}

export function createPurchaseContext(data: PurchaseContext): PurchaseContext {
    return structuredClone(data)
}