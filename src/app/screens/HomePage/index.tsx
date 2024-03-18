import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Statistics } from "./statistics";
import { BigSales } from "./bigSales";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import { Brands } from "./brands";
import { BestProducts } from "./bestProducts";
import { CollectionType } from "./collectionType";
import "../../../css/home.css";
import { NavbarHome } from "../../components/header";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setBestProducts} from "../../screens/HomePage/slice";
import {
  retrieveBestProducts,
} from "../../screens/HomePage/selector";
import { Product } from "../../../types/product";


// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBestProducts: (data: Product[]) => dispatch(setBestProducts(data)),
});

// REDUX SELECTOR
const bestProductsRetriever = createSelector(
  retrieveBestProducts,
  (bestProducts) => ({
    bestProducts,
  })
);

export function HomePage() {
  // Initialization
  const { setBestProducts } = actionDispatch(useDispatch());
  const { bestProducts } = useSelector(bestProductsRetriever);

  console.log("bestProducts:::", bestProducts);
  useEffect(() => {
    // backend data request =>  data
    setBestProducts([]);
  }, []);
  return (
    <div className="homepage">
      <NavbarHome />
      <Statistics />
      <CollectionType />
      <BestProducts />
      <BigSales />
      <Advertisements />
      <Events />
      <Brands />
    </div>
  );
}

    // "redux-logger": "^3.0.12",
      //  "@reduxjs/toolkit": "^1.8.5",
        //  "@types/redux-logger": "^3.0.12",