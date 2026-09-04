import { expect } from '@playwright/test';
import { TestContext, getDynamicData, getStaticData } from '../context/testContext';
import { Scene } from './scene';
import { AuthUser } from '../api/authApi';

export class VerifyRegisteredUserScene implements Scene{
    static readonly key = 'verifyRegisteredUser';
  constructor(
    private readonly context: TestContext
  ) {}

  async run(): Promise<void> {
    const registeredUser = getDynamicData<AuthUser>(this.context, 'user.registered');
    const token = getDynamicData<string>(this.context, 'user.token');

    expect(registeredUser.id).toBeTruthy();

    expect(registeredUser.email).toBeTruthy();

    expect(registeredUser.name).toBe(getStaticData<string>(this.context, 'user.name'));
    
    expect(token).toBeTruthy(); 
  }
}