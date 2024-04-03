import React, { useEffect, useState } from "react";
import { Box, Checkbox, Container, Stack } from "@mui/material";
import { Close, Home, RemoveRedEye } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";

// REDUX
import { createSelector } from "reselect";
import { setChosenEvent, setChosenShop,} from "./slice";
import { serverApi } from "../../../lib/config";
import { retrieveChosenEvent, retrieveChosenShop, } from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import { Shop } from "../../../types/user";
import { useDispatch, useSelector } from "react-redux";
import EventApiService from "../../apiServices/eventApiService";
import { Event } from "../../../types/event";
import ShopApiService from "../../apiServices/shopApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { EventCommentPage } from "./commentEvent";
import { verifiedMemberData } from "../../apiServices/verify";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenEvent: (data: Event) => dispatch(setChosenEvent(data)),
  setChosenShop: (data: Shop) => dispatch(setChosenShop(data)),
});
// REDUX SELECTOR
const chosenEventRetriever = createSelector(
  retrieveChosenEvent,
  (chosenEvent) => ({
    chosenEvent,
  })
);
const chosenShopRetriever = createSelector(
  retrieveChosenShop,
  (chosenShop) => ({
    chosenShop,
  })
);

export function ChosenEvent() {
  // INITIALIZATIONS
  const history = useHistory();
  let { event_id } = useParams<{ event_id: string }>();
  const { setChosenEvent, setChosenShop } = actionDispatch(useDispatch());
  const { chosenEvent } = useSelector(chosenEventRetriever);
  const { chosenShop } = useSelector(chosenShopRetriever);

  const [eventRebuild, setEventRebuild] = useState<Date>(new Date());

  const eventRelatedProcess = async () => {
    try {
      const eventService = new EventApiService();
      const event: Event = await eventService.getChosenEvent(event_id);
      setChosenEvent(event);

      const shopService = new ShopApiService();
      const shop = await shopService.getChosenShop(event.shop_mb_id);
      setChosenShop(shop);
    } catch (err) {
      console.log(`eventRelatedProcess ERROR:`, err);
    }
  };
  /** HANDLERS */
  const targetLikeEvent = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "event",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setEventRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeEvent, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  useEffect(() => {
    eventRelatedProcess().then();
  }, [eventRebuild]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div>
      <div className="mobile_version">
        <p> Mobile version is on developing process! Please use laptop</p>
      </div>
      <div className="chosen_event_page">
        <Container>
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/store")} className="home_link">
              OneEvent
              <Close className="close" />
            </Box>
          </Box>
        </Container>
        <Container>
          <Stack className="event_container">
            <Stack className="chosen_event_wrap">
              {chosenEvent?.event_images.map((ele: string) => {
                const image_path = `${serverApi}/${ele}`;
                return (
                  <img src={image_path} className="img_selec" alt="product" />
                );
              })}
            </Stack>

            <Stack className="event_info_container">
              <strong className="event_inf"> {chosenEvent?.event_name}</strong>
              <span className="event_desc"> Holder: {chosenShop?.mb_nick}</span>
              <span className="event_desc">
                Address: {chosenEvent?.event_address}
              </span>
              <span className="event_desc">
                Time: {chosenEvent?.event_time}
              </span>
              <p className="pro_desc_info">
                Description: {chosenEvent?.event_description}
              </p>
              <Box className="rating_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id={chosenEvent?._id}
                    onClick={targetLikeEvent}
                    checked={
                      chosenEvent?.me_liked &&
                      chosenEvent?.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
                  />
                  <span>{chosenEvent?.event_likes}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEye sx={{ mr: "10px" }} />
                  <span>{chosenEvent?.event_views}</span>
                </div>
              </Box>
            </Stack>
          </Stack>
          <EventCommentPage chosenEvent={chosenEvent} />
        </Container>
      </div>
    </div>
  );
}
