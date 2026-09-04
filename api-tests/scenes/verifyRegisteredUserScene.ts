import { expect } from '@playwright/test';
import { TestContext, getDynamicData } from '../context/testContext';
import { PurchaseFlowData } from '../data/purchaseFlowData';
import { Scene } from './scene';
import { AuthUser } from '../api/authApi';

export class VerifyRegisteredUserScene implements Scene{
    static readonly key = 'verifyRegisteredUser';
  constructor(
    private readonly context: TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    const registeredUser = getDynamicData<AuthUser>(this.context, 'user.registered');
    const token = getDynamicData<string>(this.context, 'user.token');

    expect(registeredUser.id).toBeTruthy();

    expect(registeredUser.email).toBeTruthy();

    expect(registeredUser.name).toBe(this.context.staticData.user.name);
    
    expect(token).toBeTruthy(); 
  }
}