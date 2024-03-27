import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenProduct } from "./chosenProduct";
import { OneShop } from "./oneShop";
import { AllShops } from "./allShops";
import "../../../css/shop.css";
import { NavbarShop } from "../../components/header/shop";

export function ShopPage(props: any) {
  let shop = useRouteMatch();
  return (
    <div className="shop_page">
      <NavbarShop />
      <Switch>
        <Route path={`${shop.path}/product/:product_id`}>
          <ChosenProduct onAdd={props.onAdd} />
        </Route>
        <Route path={`${shop.path}/:shop_id`}>
          <OneShop onAdd={props.onAdd} />
        </Route>
        <Route path={`${shop.path}`}>
          <AllShops />
        </Route>
      </Switch>
    </div>
  );
}
