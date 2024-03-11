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

export function HomePage() {
   // selector: store => data
  useEffect(() => {
    // backend data request =>  data
    // slice:  data => redux store
  }, []);
  return (
    <div className="homepage">
      <NavbarHome/>
      <Statistics />
      <CollectionType />
      <BestProducts />
      <BigSales/>
      <Advertisements />
      <Events />
      <Brands />
    </div>
  );
}
