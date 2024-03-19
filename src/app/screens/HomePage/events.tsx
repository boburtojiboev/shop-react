import { Box, Container,  Stack, } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewsEvents } from "../../screens/HomePage/slice";
import EventApiService from "../../apiServices/eventApiService";
import { retrieveNewsEvents } from "./selector";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";
import { Event } from "../../../types/event";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setNewsEvents: (data: Event[]) => dispatch(setNewsEvents(data)),
});

// REDUX SELECTOR
const newsEventsRetriever = createSelector(
  retrieveNewsEvents,
  (newsEvents) => ({
    newsEvents,
  })
);


export function Events() {
  // Initialization
  const { setNewsEvents } = actionDispatch(useDispatch());
  const { newsEvents } = useSelector(newsEventsRetriever);

  console.log("newsEvents:::", newsEvents);
  useEffect(() => {
    const productService = new EventApiService();
    productService
      .getEvents({ order: "createdAt", page: 1, limit: 4 })
      .then((data) => {
        setNewsEvents(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={"review_for_shop"}>
      <Container
        sx={{ mt: "60px" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box className="category_title_review">Events and Ceremony</Box>
        <Box className="category_title_box">
          <Box className="more_than">
            <ListAltIcon style={{ height: "40px" }} />
            more than
          </Box>
        </Box>
        <Stack
          flexDirection={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          className="event_stack"
        >
          {newsEvents.map((ele, index) => {
            // const image_path = `${serverApi}/${ele.event_images[0]}`;
            const image_path = ele?.event_images
              ? `${serverApi}/${ele.event_images[0]}`
              : "/shops/open.jpeg";
            return (
              <Box className="review_box_review" key={`${index}`}>
                <Box display={"flex"} justifyContent={"center"}>
                  <img src={image_path} className="review_img_review" />
                </Box>
                <span className="review_name_review">
                  {ele.event_name}
                </span>
                <span className="review_prof_rev">
                  <LocationOnIcon
                    style={{
                      marginRight: "10px",
                      paddingTop: "10px",
                      width: "35pxpx",
                      height: "35px",
                    }}
                  />
                  {ele.event_address}
                </span>
                <Box className="details_box">
                  <p>Details</p>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}
