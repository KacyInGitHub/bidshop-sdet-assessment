import { expect } from '@playwright/test';
import { TestContext, getDynamicData } from '../context/testContext';
import { PurchaseFlowData } from '../data/purchaseFlowData';

export class VerifyRegisteredUserScene {
  constructor(
    private readonly context: TestContext<PurchaseFlowData>
  ) {}

  async run(): Promise<void> {
    //expect(this.context.user.id).toBeTruthy();
    expect(getDynamicData(this.context, "user.id")).toBeTruthy();

    expect(getDynamicData(this.context, 'user.token')).toBeTruthy();

    expect(getDynamicData(this.context, 'user.email')).toBeTruthy();
    
    // TODO... No hard code
    expect(this.context.staticData.user.name).toBe('E2E Test User'); 
  }
}