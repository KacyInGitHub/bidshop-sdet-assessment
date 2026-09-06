import { test } from "../fixtures/apiFixture";
import { registerPurchaseCase } from "../cases/purchaseFlow.spec";
import { purchaseExtraValidationCase } from "../cases/purchaseFlowValidation.spec";

// Available modes: 'default', 'parallel', 'serial'.
// Use 'serial' because the Bidshop backend uses shared in-memory state,
// and concurrent purchase cases may modify the same product stock.
test.describe.configure({
  mode: "serial",
});

registerPurchaseCase();
purchaseExtraValidationCase();
