import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTopShops } from "../../screens/HomePage/slice";
import { Shop } from "../../../types/user";
import ShopApiService from "../../apiServices/shopApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTopShops: (data: Shop[]) => dispatch(setTopShops(data)),
});

export function HomePage(props: any) {
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
  }, [setTopShops]);
  return (
    <div className="homepage">
      <NavbarHome />
      <Statistics />
      <CollectionType />
      <BestProducts onAdd={props.onAdd} />
      <BigSales onAdd={props.onAdd} />
      <Advertisements />
      <Events />
      <Brands />
    </div>
  );
}
