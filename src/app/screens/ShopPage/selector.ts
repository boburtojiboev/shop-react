import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopPage;

export const retrieveTargetShops = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.targetShops
);
export const retrieveRandomShops = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.randomShops
);
export const retrieveChosenShop = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.chosenShop
);
export const retrieveTargetProducts = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.targetProducts
);
export const retrieveChosenDish = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.chosenProduct
);
