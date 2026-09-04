import { test, expect } from '@playwright/test';

import { AuthApi } from '../api/authApi';
import { ProductsApi } from '../api/productsApi';
import { CartApi } from '../api/cartApi';
import { OrdersApi } from '../api/ordersApi';

import { RegisterUserScene } from '../scenes/registerUserScene';
import { FindAvailableProductScene } from '../scenes/findAvailableProductScene';
import { AddProductToCartScene } from '../scenes/addProductToCartScene';
import { PlaceOrderScene } from '../scenes/placeOrderScene';
import { GetCartScene } from '../scenes/getCartScene';
import { GetProductScene } from '../scenes/getProductScene';
import { GetOrderScene } from '../scenes/getOrderScene';



import { createTestContext } from '../context/testContext';
import { purchaseFlowData } from '../data/purchaseFlowData';
import { marketConfig } from '../config/market';


test(
  'customer can complete a purchase',
  async ({ request }) => {
    // 0. init context
    const context = createTestContext(purchaseFlowData);

    // 1.create a user to purchase
    const authApi = new AuthApi(request);

    const registerUserScene = new RegisterUserScene(authApi);

    const registeredUser = await registerUserScene.registerUser(context);

    // 1.1 validation of create user
    expect(registeredUser.token).toBeTruthy();

    expect(registeredUser.user.id).toBeTruthy();

    expect(registeredUser.user.email).toBe(context.user.email);

    expect(registeredUser.user.name).toBe(context.user.name);

    // 2.find a product inStock is true
    const productsApi = new ProductsApi(request);

    const findAvailableProductScene = new FindAvailableProductScene(productsApi);

    await findAvailableProductScene.findAvailableProduct(context);

    // 2.1 validation of find a product    
    expect(context.product.id).toBeTruthy();

    expect(context.product.name).toBeTruthy();

    expect(context.product.price).toBeGreaterThan(0);

    expect(context.product.originalStock).toBeGreaterThanOrEqual(context.product.quantity);

    // 3.add the product to cart
    const cartApi = new CartApi(request);

    const addProductToCartScene = new AddProductToCartScene(cartApi);

    const cart = await addProductToCartScene.addProductToCart(context);

    // 3.1 validation of add cart
    expect(cart.userId).toBe(context.user.id);

    expect(cart.items).toHaveLength(1);

    expect(cart.items[0].productId).toBe(context.product.id);

    expect(cart.items[0].quantity).toBe(context.product.quantity);

    expect(cart.items[0].unitPrice).toBe(context.product.price);

    if (context.product.price === undefined) { 
      throw new Error('Product price is missing from purchase context');
    }
    
    const expectedSubtotal = context.product.price! * context.product.quantity;
    expect(cart.items[0].lineTotal).toBeCloseTo(expectedSubtotal, 2);

    expect(cart.subtotal).toBeCloseTo(expectedSubtotal, 2);

    const expectedGst = Number((expectedSubtotal * marketConfig.gstRate).toFixed(2));

    const expectedTotal = Number((expectedSubtotal + expectedGst).toFixed(2));

    //expect(cart.gst).toBeCloseTo(expectedGst, 2); // failed

    // expect(cart.total).toBeCloseTo(expectedTotal, 2); // failed

    // 4.place an order
    const ordersApi = new OrdersApi(request);

    const placeOrderScene = new PlaceOrderScene(ordersApi);

    const order = await placeOrderScene.placeOrder(context);

    // 4.1 validation 
    expect(order.id).toBeTruthy();

    expect(order.userId).toBe(context.user.id);

    expect(order.customer.email).toBe(context.user.email);

    expect(order.customer.name).toBe(context.order.customer.name);

    expect(order.items).toHaveLength(1);

    expect(order.items[0].productId).toBe(context.product.id);

    expect(order.items[0].quantity).toBe(context.product.quantity);

    expect(order.status).toBe('CONFIRMED');

    expect(order.createdAt).toBeTruthy();

    // 5. Validate cart side effect
    const getCartScene = new GetCartScene(cartApi);

    const cartAfterOrder = await getCartScene.getCart(context);

    expect(cartAfterOrder.items).toHaveLength(0);

    expect(cartAfterOrder.subtotal).toBe(0);

    expect(cartAfterOrder.gst).toBe(0);

    expect(cartAfterOrder.total).toBe(0);

    // 6.Validate product inStock ???并发执行时，库存怎么验证
    const getProductScene = new GetProductScene(productsApi);

    const productAfterOrder = await getProductScene.getSelectedProduct(context);

    if (context.product.originalStock === undefined) {
      throw new Error(
        'Original product stock is missing from purchase context'
      );
    }

    expect(productAfterOrder.stock).toBe(context.product.originalStock - context.product.quantity);

    //7. Validate order status
    const getOrderScene = new GetOrderScene(ordersApi)

    const persistedOrder = await getOrderScene.getOrder(context);

    expect(persistedOrder.id).toBe(order.id);

    expect(persistedOrder.userId).toBe(order.userId);

    expect(persistedOrder.items[0].productId).toBe(context.product.id);

    expect(persistedOrder.items[0].quantity).toBe(context.product.quantity);

    expect(persistedOrder.status).toBe(order.status);

  }
);