import { expect } from '@playwright/test';
import { TestContext, getDynamicData } from '../context/testContext';
import { PurchaseFlowData } from '../data/purchaseFlowData';
import { Scene } from './scene';

export class VerifyRegisteredUserScene implements Scene{
    static readonly key = 'verifyRegisteredUser';
  constructor(
    private readonly context: TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    //expect(this.context.user.id).toBeTruthy();
    expect(getDynamicData(this.context, "user.id")).toBeTruthy();

    expect(getDynamicData(this.context, 'user.token')).toBeTruthy();

    expect(getDynamicData(this.context, 'user.email')).toBeTruthy();
    
    // TODO... No hard code
    expect(getDynamicData(this.context, 'user.name')).toBe(this.context.staticData.user.name); 
  }
}