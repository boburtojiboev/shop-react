import React, { useState } from "react";
import { Box, Button, Checkbox, Container, Stack } from "@mui/material";
import { Close, Home, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ReactImageMagnify from "react-image-magnify";
import { useHistory } from "react-router-dom";

export function ChosenEvent() {
  const history = useHistory();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
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
            <img
              src="/shops/sneakers.jpg"
              className="img_selec"
              alt="product"
            />
          </Stack>

          <Stack className="event_info_container">
            <strong className="event_inf">Event Name</strong>
            <span className="event_desc">Event holder</span>
            <span className="event_desc">Event location</span>
            <span className="event_desc">Event time</span>
            <p className="pro_desc_info">
              Description: wow that would be great open caremony
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
                  checked={true}
                />
                <span>98</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RemoveRedEye sx={{ mr: "10px" }} />
                <span>1000</span>
              </div>
            </Box>
          </Stack>
        </Stack>
        <Stack className="commet_box">
          <h1 className="comment">Comment Part</h1>
          <Marginer direction="horizontal" height="1" width="100%" bg="#000" />
          {Array.from(Array(5).keys()).map((ele, index) => {
            return (
              <Box className="comment_wrap">
                <Box className="comment_txt">
                  <img
                    src={"/shops/sneakers.jpg"}
                    alt="product_image"
                    className="img_comment"
                  />
                  <span className="commenter">Commenter name</span>
                  <p className="comment_time">2days ago</p>
                </Box>
                <Box className="comm_desc_box">
                  <span className="comment_des_txt">Comment discription</span>
                </Box>
              </Box>
            );
          })}
        </Stack>

        <Box className="input_frame">
          <div className="long_input">
            <label className="spec_label">Add comment</label>
            <textarea
              placeholder={"comment"}
              name={"description"}
              className={"spec_textarea mb_description"}
            />
          </div>
        </Box>
        <Box
          display="flex"
          justifyContent={"flex-end"}
          sx={{ mt: "25px", mb: "20px" }}
        >
          <Button variant="contained">Post</Button>
        </Box>
      </Container>
    </div>
  );
}
