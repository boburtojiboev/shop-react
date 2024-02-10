import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Header } from "./header";

export function NavbarHome(props: any) {
  const history = useHistory();
  return (
    <div>
      {/* <div className="format home_navbar">
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
          <Box className="msg_box">msg</Box>
        </Container>
      </div> */}
      {/* <Header/> */}
      {/* <Stack className="head_information">
        <h1 className="info_store">Brand Name</h1>
      </Stack> */}

      <Swiper
        spaceBetween={0}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // modules={[Autoplay, Pagination]}
        // className="mySwiper"
      >
        <SwiperSlide>
          <Stack className="head_information1">
            <Stack className="box_head">
              <h2 className="head_title">All collections about shoe...</h2>
              <p className="head_text">
                The type of shoe you should buy depends on how you travel. Try
                to consider the practicalities before being enticed by the
                endless colours and styles available!
              </p>
              <button
                onClick={() => history.push("/store")}
                className="info_store"
              >
                Get Your Shoes
              </button>
            </Stack>
          </Stack>
        </SwiperSlide>

        <SwiperSlide>
          <Stack className="head_information2">
            <Stack className="box_head">
              <h2 className="head_title">All collections about shoe...</h2>
              <p className="head_text">
                The type of shoe you should buy depends on how you travel. Try
                to consider the practicalities before being enticed by the
                endless colours and styles available!
              </p>
              <button
                onClick={() => history.push("/store")}
                className="info_store"
              >
                Get Your Shoes
              </button>
            </Stack>
          </Stack>
        </SwiperSlide>

        <SwiperSlide>
          <Stack className="head_information3">
            <Stack className="box_head">
              <h2 className="head_title">All collections about shoe...</h2>
              <p className="head_text">
                The type of shoe you should buy depends on how you travel. Try
                to consider the practicalities before being enticed by the
                endless colours and styles available!
              </p>
              <button
                onClick={() => history.push("/store")}
                className="info_store"
              >
                Get Your Shoes
              </button>
            </Stack>
          </Stack>
        </SwiperSlide>

        <SwiperSlide>
          <Stack className="head_information4">
            <Stack className="box_head">
              <h2 className="head_title">All collections about shoe...</h2>
              <p className="head_text">
                The type of shoe you should buy depends on how you travel. Try
                to consider the practicalities before being enticed by the
                endless colours and styles available!
              </p>
              <button
                onClick={() => history.push("/store")}
                className="info_store"
              >
                Get Your Shoes
              </button>
            </Stack>
          </Stack>
        </SwiperSlide>

        <SwiperSlide>
          <Stack className="head_information5">
            <Stack className="box_head">
              <h2 className="head_title">All collections about shoe...</h2>
              <p className="head_text">
                The type of shoe you should buy depends on how you travel. Try
                to consider the practicalities before being enticed by the
                endless colours and styles available!
              </p>
              <button
                onClick={() => history.push("/store")}
                className="info_store"
              >
                Get Your Shoes
              </button>
            </Stack>
          </Stack>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
