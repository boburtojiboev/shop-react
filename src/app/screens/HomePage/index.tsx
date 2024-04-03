import React from "react";
import { Statistics } from "./statistics";
import { BigSales } from "./bigSales";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import { Brands } from "./brands";
import { BestProducts } from "./bestProducts";
import { CollectionType } from "./collectionType";
import "../../../css/home.css";
import { NavbarHome } from "../../components/header";

export function HomePage(props: any) {
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
