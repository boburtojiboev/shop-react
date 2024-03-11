import { Event } from "./event";
import { Product } from "./product";
import { Shop } from "./user";

export interface AppRootState {
  homePage: HomePageState;
}

export interface HomePageState {
  bestProducts: Product[];
  saleProducts: Product[];
  newsEvents: Event[];
  topShops: Shop[];
}
