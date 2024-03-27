import {
  Box,
  Button,
  Container,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Chatting } from "./chatting";
import { Basket } from "./basket";
import { Logout } from "@mui/icons-material";

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
              className="shoekershop"
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
              <NavLink to="/event" activeClassName="underline">
                Event
              </NavLink>
            </Box>
            {/* {props.verifiedMemberData ? ( */}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/orders" activeClassName="underline">
                Orders
              </NavLink>
            </Box>
            {/* ) : null} */}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>
            {props.verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  MyPage
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>

            <Basket
              className="basket_box"
              cartItems={props.cartItems}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              onDelete={props.onDelete}
            />

            {!props.verifiedMemberData ? (
              <Box className="login">
                <Button
                  variant="contained"
                  style={{
                    width: "80px",
                    color: "#ffffff",
                    background: "#0383a3",
                  }}
                  onClick={props.handleLoginOpen}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                src={props.verifiedMemberData.mb_image}
                alt="member_img"
                onClick={props.handleLogOutClick}
              />
            )}
            <Menu
              anchorEl={props.anchorEl}
              open={props.open}
              onClose={props.handleCloseLogOut}
              onClick={props.handleCloseLogOut}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px, 2px, 8px, rgba(0, 0, 0, 0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: "''",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={props.handleLogOutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "red" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

            {!props.verifiedMemberData ? (
              <Box className="login">
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    color: "#ffffff",
                    background: "#0383a3",
                  }}
                  onClick={props.handleSignupOpen}
                >
                  Sign Up
                </Button>
              </Box>
            ) : null}
          </Stack>
        </Stack>
        <Box className="msg_box">
          <Chatting />
        </Box>
      </Container>
    </div>
  );
}
