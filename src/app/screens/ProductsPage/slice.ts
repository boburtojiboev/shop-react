import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../types/screen";

const initialState: ProductPageState = {
  allProducts: [],
};

const productPageSlice = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const {
  setAllProducts,
} = productPageSlice.actions;

const ProductPageReducer = productPageSlice.reducer;
export default ProductPageReducer;
