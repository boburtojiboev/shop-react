import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import HomePageReducer from './screens/HomePage/slice';
import reduxLogger from 'redux-logger';
import ShopPageReducer from './screens/ShopPage/slice';
import EventPageReducer from './screens/EventPage/slice';
import ProductPageReducer from './screens/ProductsPage/slice';
import OrdersPageReducer from "./screens/OrdersPage/slice";
import CommunityPageRaducer from './screens/CommunityPage/slice';
import MemberPageRaducer from './screens/MemberPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productPage: ProductPageReducer,
    shopPage: ShopPageReducer,
    eventPage: EventPageReducer,
    ordersPage: OrdersPageReducer,
    communityPage: CommunityPageRaducer,
    memberPage: MemberPageRaducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;