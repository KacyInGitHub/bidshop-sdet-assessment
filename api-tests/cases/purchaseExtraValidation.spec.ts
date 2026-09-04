import { test } from '../fixtures/apiFixture';


test(
  'customer can complete a purchase',
  async ({ scenes }) => {

    await scenes.registerUser.run();

    await scenes.verifyRegisteredUser.run();

    await scenes.findAvailableProduct.run();

    await scenes.addProductToCart.run();

    await scenes.placeOrder.run();

    await scenes.getCart.run();

    await scenes.getProduct.run();

    await scenes.getOrder.run();
  }
);