import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;

export const retrieveAllProducts = createSelector(
  selectProductPage,
  (ProductPage) => ProductPage.allProducts
);
