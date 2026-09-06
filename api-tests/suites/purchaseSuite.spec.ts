import { test } from "../fixtures/apiFixture";
import { registerPurchaseCase } from "../cases/purchase.spec";
import { purchaseExtraValidationCase } from "../cases/purchaseExtraValidation.spec";

// serial
test.describe.configure({
  mode: "parallel",
});

registerPurchaseCase();
purchaseExtraValidationCase();
