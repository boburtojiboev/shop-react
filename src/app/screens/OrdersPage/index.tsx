import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import "../../../css/order.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import FinishedOrders from "../../components/orders/finishedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import PausedOrders from "../../components/orders/pausedOrders";
import Marginer from "../../components/marginer";
import { NavbarOthers } from "../../components/header/others";
import { Close, Home } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { Order } from "../../../types/order";
import { verifiedMemberData } from "../../apiServices/verify";
// REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
} from "../../screens/OrdersPage/slice";
import OrderApiService from "../../apiServices/orderApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export function OrdersPage(props: any) {
  /** INITIALIZATION **/
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const history = useHistory();

  useEffect(() => {
    const orderService = new OrderApiService();
    orderService
      .getMyOrders("paused")
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("process")
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    orderService
      .getMyOrders("finished")
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [props.orderRebuild, setFinishedOrders,setPausedOrders,setProcessOrders]);

  /** HANDLERS *****/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  }
  return (
    <div>
      <NavbarOthers />
      <div className="mobile_version">
        <p> Mobile version is on developing process! Please use laptop</p>
      </div>
      <div className="order_page">
        <Container>
          {" "}
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/")} className="home_link">
              Orders
              <Close className="close" />
            </Box>
          </Box>
        </Container>
        <Container
          maxWidth="lg"
          style={{ display: "flex", flexDirection: "row" }}
          sx={{ mt: "20px", mb: "50px" }}
        >
          <Stack className="right_order">
            <Box className="order_info_box">
              <Box
                display="flex"
                marginBottom={"40px"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box className="order_user_img">
                  <img
                    src={verifiedMemberData?.mb_image}
                    className="order_user_avatar"
                    alt=""
                  />
                  <Box className="order_user_icon_box">
                    <img
                      src="/icons/user_icon.svg"
                      className="order_user_prof_img"
                      alt=""
                    />
                  </Box>
                </Box>
                <span className="order_user_name">
                  {verifiedMemberData?.mb_nick}
                </span>
                <span className="order_user_prof">
                  {verifiedMemberData?.mb_type ?? "Foydalanuvchi"}
                </span>
              </Box>

              <Box className="order_user_address" marginTop={"8px"}>
                <Marginer
                  direction="horizontal"
                  width="100%"
                  height="100%"
                  bg="rgb(161, 161, 161)"
                />

                <Box style={{ marginTop: "10px", display: "flex" }}>
                  <LocationOnIcon />
                  <div className="spec_address_txt">
                    {verifiedMemberData?.mb_address ?? "manzil kiritilmagan"}
                  </div>
                </Box>
              </Box>
            </Box>
            <form className="order_info_box" style={{ marginTop: "15px" }}>
              <input
                type="text"
                name="card_number"
                className="card_input"
                placeholder="Card number : 5243 4090 2002 7495"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="text"
                  name="card_period"
                  className="card_half_input"
                  placeholder="09 / 27"
                />
                <input
                  type="text"
                  name="card_cvv"
                  placeholder="CVV : 010"
                  className="card_half_input"
                />
              </Box>
              <input
                type="text"
                name="card_creator"
                placeholder={verifiedMemberData?.mb_nick}
                className="card_input"
              />
              <Stack className="cards_box">
                <img src="/icons/western_card.svg" alt="" />
                <img src="/icons/master_card.svg" alt="" />
                <img src="/icons/paypal_card.svg" alt="" />
                <img src="/icons/visa_card.svg" alt="" />
              </Stack>
            </form>
          </Stack>

          <Stack className="left_order">
            <TabContext value={value}>
              <Box className="order_nav_frame">
                <Box>
                  <TabList
                    onChange={handleChange}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Tab label="Paused" value={"1"}></Tab>
                    <Tab label="Process" value={"2"}></Tab>
                    <Tab label="Finished" value={"3"}></Tab>
                  </TabList>
                </Box>
              </Box>
              <Stack className="order_main_content">
                <PausedOrders
                  setOrderRebuild={props.setOrderRebuild}
                  setValue={setValue}
                />
                <ProcessOrders
                  setOrderRebuild={props.setOrderRebuild}
                  setValue={setValue}
                />
                <FinishedOrders setOrderRebuild={props.setOrderRebuild} />
              </Stack>
            </TabContext>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
