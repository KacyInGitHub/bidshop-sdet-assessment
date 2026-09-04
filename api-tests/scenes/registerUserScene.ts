import {
  AuthApi,
  RegisterRequest,
  AuthResponse
} from '../api/authApi';

import {
  TestContext
} from '../context/testContext';

import {
  generateUniqueEmail
} from '../factories/userFactory';


export class RegisterUserScene {
  constructor(
    private readonly authApi: AuthApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {

    const email =
      generateUniqueEmail();

    const requestBody: RegisterRequest = {
      email,
      password:
        this.context.user.password,
      name:
        this.context.user.name
    };

    const response =
      await this.authApi.register(
        requestBody
      );

    if (response.status() !== 201) {
      throw new Error(
        `User registration failed. Status: ${response.status()}`
      );
    }

    const body =
      await response.json() as AuthResponse;

    this.context.user.email =
      body.user.email;

    this.context.user.id =
      body.user.id;

    this.context.user.name =
      body.user.name;

    this.context.user.token =
      body.token;
  }
}