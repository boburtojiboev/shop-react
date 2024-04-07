import { Stack } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function NavbarHome(props: any) {
  const history = useHistory();
  return (
    <div>
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
