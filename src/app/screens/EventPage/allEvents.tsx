import { Box, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Close, Home } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { Event } from "../../../types/event";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import { retrieveTargetEvents } from "./selector";
import { setTargetEvents } from "./slice";
import { useEffect, useState } from "react";
import EventApiService from "../../apiServices/eventApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetEvents: (data: Event[]) =>
    dispatch(setTargetEvents(data)),
});
// REDUX SELECTOR
const targetEventsRetriever = createSelector(
  retrieveTargetEvents,
  (targetEvents) => ({
    targetEvents,
  })
);

export function AllEvents() {
  // INITIALIZATIONS
  const history = useHistory();
  const { setTargetEvents } = actionDispatch(useDispatch());
  const { targetEvents } = useSelector(targetEventsRetriever);
  const [targetSearchObject,] = useState<SearchObj>({
    page: 1,
    limit: 20,
    order: "createdAt",
  });

  useEffect(() => {
    const shopService = new EventApiService();
    shopService
      .getEvents(targetSearchObject)
      .then((data) => setTargetEvents(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSearchObject]);

  /** HANDLERS */
  const chosenEventHandler = (id: string) => {
    history.push(`/event/${id}`);
  };
  return (
    <div className="all_event">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/")} className="home_link">
              Events
              <Close className="close" />
            </Box>
          </Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            flexWrap={"wrap"}
            gap={"20px"}
            justifyContent={"space-between"}
            width={"100%"}
            marginBottom={"60px"}
          >
            {targetEvents.map((ele: Event) => {
              const image_path = `${serverApi}/${ele.event_images[0]}`;
              return (
                <Box className="review_box_review" key={ele._id}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img src={image_path} className="review_img_review" alt=""/>
                  </Box>
                  <span className="review_name_review">{ele.event_name}</span>
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
                  <Box
                    onClick={() => chosenEventHandler(ele._id)}
                    className="details_box"
                  >
                    <p>Details</p>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

