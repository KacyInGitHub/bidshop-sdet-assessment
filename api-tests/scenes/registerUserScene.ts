import { AuthApi, RegisterRequest, AuthResponse } from '../api/authApi';
import { TestContext,setDynamicData, getStaticData } from '../context/testContext';
import { generateUniqueEmail } from '../factories/userFactory';
import { Scene } from './scene';

export class RegisterUserScene implements Scene{
  static readonly key = 'registerUser';
  static readonly api = ['auth'] as const

  constructor(
    private readonly authApi: AuthApi,
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
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

    const email = generateUniqueEmail();

    const requestBody:
      RegisterRequest = {
        email,
        password,
        name
      };

    setDynamicData(
      this.context,
      'user.email',
      email
    );

    const response = await this.authApi.register(requestBody);

    if (response.status() !== 201) {
      throw new Error(
        `User registration failed. Status: ${response.status()}`
      );
    }

    const body = await response.json() as AuthResponse;

    setDynamicData(
      this.context,
      'user.token',
      body.token
    );

    setDynamicData(
      this.context,
      'user.registered',
      body.user
    );
  }
}