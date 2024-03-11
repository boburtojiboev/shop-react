import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveBestProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestProducts
);
export const retrieveSaleProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.saleProducts
);
export const retrieveNewsEvents = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newsEvents
);
export const retrieveTopShops = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topShops
);
