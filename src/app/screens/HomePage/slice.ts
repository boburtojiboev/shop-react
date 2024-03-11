import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  bestProducts: [],
  saleProducts: [],
  newsEvents: [],
  topShops: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setBestProducts: (state, action) => {
      state.bestProducts = action.payload;
    },
    setSaleProducts: (state, action) => {
      state.saleProducts = action.payload;
    },
    setNewsEvents: (state, action) => {
      state.newsEvents = action.payload;
    },
    setTopShops: (state, action) => {
      state.topShops = action.payload;
    },
  },
});

export const {
  setBestProducts,
  setSaleProducts,
  setNewsEvents,
  setTopShops,
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
