import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import HomePageReducer from './screens/HomePage/slice';
import reduxLogger from 'redux-logger';
import ShopPageReducer from './screens/ShopPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    shopPage: ShopPageReducer,
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