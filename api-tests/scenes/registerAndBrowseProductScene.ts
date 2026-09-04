import {
  AuthApi,
  RegisterRequest,
  AuthResponse
} from '../api/authApi';

import {
  ProductsApi,
  ProductList
} from '../api/productsApi';

import {
  TestContext,
  getStaticData,
  setDynamicData
} from '../context/testContext';

import {
  generateUniqueEmail
} from '../factories/userFactory';

import { Scene } from './scene';


type RegisterAndBrowseProductsApis = {
  auth: AuthApi;
  products: ProductsApi;
};


export class RegisterAndBrowseProductsScene
  implements Scene {

  static readonly key =
    'registerAndBrowseProducts';

  static readonly apis = [
    'auth',
    'products'
  ] as const;


  constructor(
    private readonly apis:
      RegisterAndBrowseProductsApis,

    private readonly context:
      TestContext
  ) {}


  async run(): Promise<void> {

    // -------------------------
    // 1. Register user
    // -------------------------

    const name =
      getStaticData<string>(
        this.context,
        'user.name'
      );

    const password =
      getStaticData<string>(
        this.context,
        'user.password'
      );

    const email =
      generateUniqueEmail();

    const registerRequest:
      RegisterRequest = {
        email,
        password,
        name
      };


    setDynamicData(
      this.context,
      'user.requestedEmail',
      email
    );


    const registerResponse =
      await this.apis.auth.register(
        registerRequest
      );


    if (registerResponse.status() !== 201) {
      throw new Error(
        `User registration failed. Status: ${registerResponse.status()}`
      );
    }


    const registerBody =
      await registerResponse.json() as AuthResponse;


    setDynamicData(
      this.context,
      'user.token',
      registerBody.token
    );

    setDynamicData(
      this.context,
      'user.registered',
      registerBody.user
    );


    // -------------------------
    // 2. Browse products
    // -------------------------

    const productsResponse =
      await this.apis.products
        .getProducts();


    if (productsResponse.status() !== 200) {
      throw new Error(
        `Failed to get products. Status: ${productsResponse.status()}`
      );
    }


    const products =
      await productsResponse.json() as ProductList;


    setDynamicData(
      this.context,
      'products.latest',
      products
    );
  }
}