import { Event } from "./event";
import { Product } from "./product";
import { Member, Shop } from "./user";
import {Comment} from "./comment"
import { Order } from "./order";
import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";

// REACT APP STATE//
export interface AppRootState {
  homePage: HomePageState;
  productPage: ProductPageState;
  shopPage: ShopPageState;
  eventPage: EventPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
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

// ORDERS PAGE//
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

// COMMUNITY PAGE//
export interface CommunityPageState {
 targetBoArticles: BoArticle[]
}
// MEMBER PAGE//
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle?: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}