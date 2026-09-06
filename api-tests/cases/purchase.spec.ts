import { test } from "../fixtures/apiFixture";
import { purchaseFlowData } from "../data/purchaseFlowData";

export function registerPurchaseCase(): void {
  test.describe("Purchase Case", () => {
    test.use({ testData: purchaseFlowData });

    test("customer can complete a purchase", async ({ scenes }) => {
      await scenes.registerUser.run();

      await scenes.findAvailableProduct.run();

      await scenes.addProductToCart.run();

      await scenes.placeOrder.run();

      await scenes.getCart.run();

      await scenes.getProduct.run();

      await scenes.getOrder.run();

      await scenes.registerAndBrowseProducts.run();
    });
  });
}
