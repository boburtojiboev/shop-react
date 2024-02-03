import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProductsPage } from "./screens/ProductsPage";
import { ShopPage } from "./screens/ShopPage";
import { CommunityPage } from "./screens/CommunityPage";
import { OrdersPage } from "./screens/OrdersPage";
import { MemberPage } from "./screens/MemberPage";
import { HelpPage } from "./screens/HelpPage";
import { LoginPage } from "./screens/LoginPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/header";
import { NavbarShop } from "./components/header/shop";
import { NavbarOthers } from "./components/header/others";

function App() {
    const [path, setPath] = useState();
    const main_path = window.location.pathname;
  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome setPath={setPath} />
      ) : main_path.includes("/products") ? (
        <NavbarShop setPath={setPath} />
      ) : main_path.includes("/store") ? (
        <NavbarShop setPath={setPath} />
      ) : (
        <NavbarOthers setPath={setPath} />
      )}

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/store">
          <ShopPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/member-page">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
