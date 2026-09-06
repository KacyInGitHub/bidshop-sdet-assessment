import { test } from "../fixtures/apiFixture";
import { purchaseFlowData } from "../data/purchaseFlowData";

export function purchaseExtraValidationCase(): void {
  test.describe("Purchase ExtraValidation Case", () => {
    test.use({ testData: purchaseFlowData });

    test("customer can complete a purchase and add verify for each step", async ({
      scenes,
    }) => {
      await scenes.registerUser.run();
      await scenes.verifyRegisteredUser.run();

      await scenes.findAvailableProduct.run();
      await scenes.verifyAvailableProduct.run();

      await scenes.addProductToCart.run();
      await scenes.verifyCart.run();

      await scenes.placeOrder.run();
      await scenes.verifyCreatedOrder.run();

      await scenes.getCart.run();
      await scenes.verifyCartCleared.run();

      await scenes.getProduct.run();
      await scenes.verifyProductStock.run();

      await scenes.getOrder.run();
      await scenes.verifyOrder.run();
    });
  });
}
