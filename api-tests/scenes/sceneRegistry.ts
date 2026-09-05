import { SceneClass } from './scene';
import { RegisterUserScene } from './registerUserScene';
import { FindAvailableProductScene } from './findAvailableProductScene';
import { AddProductToCartScene } from './addProductToCartScene';
import { PlaceOrderScene } from './placeOrderScene';
import { GetCartScene } from './getCartScene';
import { GetProductScene } from './getProductScene';
import { GetOrderScene } from './getOrderScene';
import { VerifyRegisteredUserScene } from './verifyRegisteredUserScene';
import { VerifyAvailableProductScene } from './verifyAvailableProductScene'
import { RegisterAndBrowseProductsScene } from './registerAndBrowseProductScene';

export const sceneClasses = [
  RegisterUserScene,
  FindAvailableProductScene,
  AddProductToCartScene,
  PlaceOrderScene,
  GetCartScene,
  GetProductScene,
  GetOrderScene,
  VerifyRegisteredUserScene,
  VerifyAvailableProductScene,
  RegisterAndBrowseProductsScene
] satisfies readonly SceneClass[];