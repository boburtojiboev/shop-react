import React from "react";
// import { NavbarShop } from "../../components/header/shop";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { NavbarShop } from "../../components/header/shop";
import { ChosenEvent } from "./chosenEvent";
import { AllEvents } from "./allEvents";
import "../../../css/event.css";

export function EventPage() {
  let shop = useRouteMatch();
  return (
    <div className="event_page">
      <NavbarShop />
      <Switch>
        <Route path={`${shop.path}/:event_id`}>
          <ChosenEvent />
        </Route>
        <Route path={`${shop.path}`}>
          <AllEvents />
        </Route>
      </Switch>
    </div>
  );
}
