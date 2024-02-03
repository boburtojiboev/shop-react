import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function NavbarHome(props: any) {
  return (
    <div>
      <div className="format home_navbar">
        <Container>
          <Stack
            flexDirection={"row"}
            className="navbar_config"
            justifyContent={"space-between"}
          >
            <Box>
              <h1
                style={{
                  marginTop: "0px",
                  color: "#ffffff",
                  marginLeft: "30px",
                }}
              >
                ShoekerShop
              </h1>
            </Box>
            <Stack
              flexDirection={"row"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              className="navbar_links"
            >
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/" activeClassName="underline">
                  Home
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/products" activeClassName="underline">
                  Product
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/store" activeClassName="underline">
                  Store
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/community" activeClassName="underline">
                  Community
                </NavLink>
              </Box>
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/help" activeClassName="underline">
                  Help
                </NavLink>
              </Box>
              <Box className="hover-line">
                <IconButton
                  aria-label="cart"
                  id="basic-button"
                  aria-controls={undefined}
                  aria-haspopup="true"
                  aria-expanded={undefined}
                  //onClick={handleClick}
                >
                  <Badge badgeContent={3} color="secondary">
                    <img src={"/icons/shopping_cart.svg"} />
                  </Badge>
                </IconButton>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    color: "#ffffff",
                    background: "#0383a3",
                  }}
                >
                  Login
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
      <Stack className="head_information">
        <h1 className="info_store">Brand Name</h1>
      </Stack>
    </div>
  );
}
