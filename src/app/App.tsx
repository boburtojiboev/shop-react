import React from "react";
import "../css/App.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./components/users";
import Products from "./components/products";

function App() {
  return (
    <Router>
      <div style={{ marginRight: "1%" }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Container>
              <Home />
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}
