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
import { setTopShops } from "../../screens/HomePage/slice";
import { retrieveTopShops } from "../../screens/HomePage/selector";
import { Shop } from "../../../types/user";
import ShopApiService from "../../apiServices/shopApiService";


// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTopShops: (data: Shop[]) => dispatch(setTopShops(data)),
});

// REDUX SELECTOR
const topShopsRetriever = createSelector(retrieveTopShops, (topShops) => ({
  topShops,
}));

export function HomePage() {
  // Initialization
  const { setTopShops } = actionDispatch(useDispatch());

  useEffect(() => {
    const shopService = new ShopApiService();
    shopService
      .getTopShops()
      .then((data) => {
        setTopShops(data);
      })
      .catch((err) => console.log(err));
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

        // "swiper": "^8.4.3",
        // "typescript": "^4.8.3",