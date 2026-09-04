import { test } from '../fixtures/purchaseFixture';


test(
  'customer can complete a purchase',
  async ({
    registerUser,
    findAvailableProduct,
    addProductToCart,
    placeOrder,
    getCart,
    getProduct,
    getOrder
  }) => {

    await registerUser.run();

    await findAvailableProduct.run();

    await addProductToCart.run();

    await placeOrder.run();

    await getCart.run();

    await getProduct.run();

    await getOrder.run();
  }
);