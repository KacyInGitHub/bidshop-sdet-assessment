export interface PurchaseFlowData {
  user: {
    name: string;
    password: string;
  };

  product: {
    quantity: number;
  };

  order: {
    customer: {
      name: string;
      address: string;
      city: string;
      postcode: string;
    };
  };
}

export const purchaseFlowData: PurchaseFlowData = {
  user: {
    name: "E2E Test User",
    password: "Password123!",
  },

  product: {
    quantity: 2,
  },

  order: {
    customer: {
      name: "E2E Test Customer",
      address: "1 Queen Street",
      city: "Auckland",
      postcode: "1010",
    },
  },
};
