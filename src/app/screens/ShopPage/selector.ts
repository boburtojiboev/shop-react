import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopPage;

export const retrieveTargetShops = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.targetShops
);
export const retrieveRandomShops = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.randomShops
);
export const retrieveChosenShop = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.chosenShop
);
export const retrieveTargetProducts = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.targetProducts
);
export const retrieveChosenProduct = createSelector(
  selectShopPage,
  (ShopPage) => ShopPage.chosenProduct
);
