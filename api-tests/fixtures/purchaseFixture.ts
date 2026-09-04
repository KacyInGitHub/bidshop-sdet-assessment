import {
  test as base
} from '@playwright/test';

import {
  createTestContext,
  TestContext
} from '../context/testContext';

import {
  purchaseFlowData
} from '../data/purchaseFlowData';

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
import { VerifyRegisteredUserScene } from '../scenes/verifyRegisteredUserScene';

import { PurchaseFlowData } from '../data/purchaseFlowData';


type PurchaseFixture = {
  testContext: TestContext<PurchaseFlowData>;

  registerUser: RegisterUserScene;

  findAvailableProduct: FindAvailableProductScene;

  addProductToCart: AddProductToCartScene;

  placeOrder: PlaceOrderScene;

  getCart: GetCartScene;

  getProduct: GetProductScene;

  getOrder: GetOrderScene;

  verifyRegisteredUser: VerifyRegisteredUserScene;
};


export const test =
  base.extend<PurchaseFixture>({

    testContext: async ({}, use) => {
      const testContext = createTestContext(purchaseFlowData);

      await use(testContext);
    },

    registerUser: async ( { request, testContext },use) => {
      const authApi = new AuthApi(request);

      const scene = new RegisterUserScene(authApi, testContext);

      await use(scene);
    },

    findAvailableProduct: async ( { request, testContext }, use) => {
      const productsApi = new ProductsApi(request);

      await use(new FindAvailableProductScene(productsApi, testContext));
    },

    addProductToCart: async ({ request, testContext }, use) => {
      const cartApi = new CartApi(request);

      await use(new AddProductToCartScene( cartApi, testContext));
    },

    placeOrder: async ({ request, testContext}, use) => {
      const ordersApi = new OrdersApi(request);

      await use(new PlaceOrderScene(ordersApi, testContext));
    },

    getCart: async ({ request, testContext },use) => {
      const cartApi = new CartApi(request);

      await use( new GetCartScene(cartApi, testContext));
    },

    getProduct: async ({ request, testContext }, use) => {
      const productApi = new ProductsApi(request);

      await use( new GetProductScene(productApi, testContext));
    },

    getOrder: async ({ request, testContext}, use) => {
      const orderApi = new OrdersApi(request);

      await use( new GetOrderScene(orderApi, testContext));
    },

    verifyRegisteredUser: async ({ testContext }, use) => {
      await use( new VerifyRegisteredUserScene( testContext));
    },
  });