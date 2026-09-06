import { SceneClass } from "./scene";
import { RegisterUserScene } from "./registerUserScene";
import { FindAvailableProductScene } from "./findAvailableProductScene";
import { AddProductToCartScene } from "./addProductToCartScene";
import { PlaceOrderScene } from "./placeOrderScene";
import { GetCartScene } from "./getCartScene";
import { GetProductScene } from "./getProductScene";
import { GetOrderScene } from "./getOrderScene";
import { RegisterAndBrowseProductsScene } from "./registerAndBrowseProductScene";
import { VerifyRegisteredUserScene } from "./verifyRegisteredUserScene";
import { VerifyAvailableProductScene } from "./verifyAvailableProductScene";
import { VerifyCartScene } from "./verifyCartScene";
import { VerifyCreatedOrderScene } from "./verifyCreatedOrderScene";
import { VerifyCartClearedScene } from "./verifyCartClearedScene";
import { VerifyProductStockScene } from "./verifyProductStockScene";
import { VerifyOrderScene } from "./verifyOrderScene";

/**
 * Central registry of Scene classes available to the test framework.
 *
 * The Scene Loader uses this registry to create Scene instances and resolve
 * their declared API dependencies. Adding a new Scene only requires registering
 * its class here; the fixture does not need to know about the concrete Scene.
 */
export const sceneClasses = [
  RegisterUserScene,
  FindAvailableProductScene,
  AddProductToCartScene,
  PlaceOrderScene,
  GetCartScene,
  GetProductScene,
  GetOrderScene,
  RegisterAndBrowseProductsScene,
  VerifyRegisteredUserScene,
  VerifyAvailableProductScene,
  VerifyCartScene,
  VerifyCreatedOrderScene,
  VerifyCartClearedScene,
  VerifyProductStockScene,
  VerifyOrderScene,
] satisfies readonly SceneClass[];
