import { Event } from "./event";
import { Product } from "./product";
import { Shop } from "./user";
import {Comment} from "./comment"

// REACT APP STATE//
export interface AppRootState {
  homePage: HomePageState;
  shopPage: ShopPageState;
  eventPage: EventPageState;
  productPage: ProductPageState;
}

// HOME PAGE//
export interface HomePageState {
  bestProducts: Product[];
  saleProducts: Product[];
  newsEvents: Event[];
  topShops: Shop[];
}

// Product PAGE//
export interface ProductPageState {
  allProducts: Product[];
}

// SHOP PAGE//
export interface ShopPageState {
  targetShops: Shop[];
  randomShops: Shop[];
  chosenShop: Shop | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
  productComment: Comment[];
}

// Event PAGE//
export interface EventPageState {
  targetEvents: Event[];
  chosenEvent: Event | null;
  eventComment: Comment[];
  chosenShop: Shop | null;
}
