import {
  AuthApi,
  RegisterRequest,
  AuthResponse
} from '../api/authApi';

import {
  TestContext,
  setDynamicData
} from '../context/testContext';

import {
  PurchaseFlowData
} from '../data/purchaseFlowData';

import {
  generateUniqueEmail
} from '../factories/userFactory';
import { Scene } from './scene';

export class RegisterUserScene implements Scene{
  static readonly key = 'registerUser';
  static readonly api = 'auth';

  constructor(
    private readonly authApi: AuthApi,

    private readonly context: TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    const email = generateUniqueEmail();

    const requestBody:
      RegisterRequest = {
      email,
      password: this.context.staticData.user.password,
      name: this.context.staticData.user.name
    };

    const response =
      await this.authApi.register(requestBody);

    if (response.status() !== 201) {
      throw new Error(
        `User registration failed. Status: ${response.status()}`
      );
    }

    const body =
      await response.json() as AuthResponse;

    setDynamicData(this.context, 'user.id', body.user.id);
    setDynamicData(this.context, 'user.email', body.user.email);
    setDynamicData(this.context, 'user.token', body.token);
    setDynamicData(this.context, 'user.registered', body.user);
  }
}