import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenProduct } from "./chosenProduct";
import { OneShop } from "./oneShop";
import { AllShops } from "./allShops";
import "../../../css/shop.css";

export function ShopPage() {
  let shop = useRouteMatch();
  return (
    <div className="shop_page">
      <Switch>
        <Route path={`${shop.path}/product/:product_id`}>
          <ChosenProduct />
        </Route>
        <Route path={`${shop.path}/:shop_id`}>
          <OneShop />
        </Route>
        <Route path={`${shop.path}`}>
          <AllShops />
        </Route>
      </Switch>
    </div>
  );
}
