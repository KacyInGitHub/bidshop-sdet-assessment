import { PurchaseContext } from "../context/purchaseContext";

export const purchaseFlowData: PurchaseContext = {
    user: {
        name: 'E2E Test User',
        password: 'Password123!'
    },

    product:{
        quantity: 2
    },

    order: {
        customer: {
            name: 'E2E Test Customer',
            address: '1 Queen Street',
            city: 'Auckland',
            postcode: '1010'
        }
    }
    
};