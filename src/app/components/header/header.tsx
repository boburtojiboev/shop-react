import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Chatting } from "./chatting";
import { Basket } from "./basket";

export function Header(props: any) {
  return (
    <div className="format home_navbar">
      <Container className="zor">
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
            <Basket/>
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
        <Box className="msg_box">
          <Chatting />
        </Box>
      </Container>
    </div>
  );
}
