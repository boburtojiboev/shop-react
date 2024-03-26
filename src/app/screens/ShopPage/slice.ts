import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../../types/screen";

const initialState: ShopPageState = {
  targetShops: [],
  randomShops: [],
  chosenShop: null,
  targetProducts: [],
  chosenProduct: null,
  productComment: [],
};

const shopPageSlice = createSlice({
  name: "shopPage",
  initialState,
  reducers: {
    setTargetShops: (state, action) => {
      state.targetShops = action.payload;
    },
    setRandomShops: (state, action) => {
      state.randomShops = action.payload;
    },
    setChosenShop: (state, action) => {
      state.chosenShop = action.payload;
    },
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProductComment: (state, action) => {
      state.productComment = action.payload;
    },
  },
});

export const {
  setTargetShops,
  setRandomShops,
  setChosenShop,
  setTargetProducts,
  setChosenProduct,
  setProductComment,
} = shopPageSlice.actions;

const ShopPageReducer = shopPageSlice.reducer;
export default ShopPageReducer;
