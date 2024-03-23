import React, { useEffect } from "react";
import { Favorite, Visibility } from "@mui/icons-material";
import { CardOverflow, IconButton } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import { AspectRatio, Link } from "@mui/joy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopShops } from "../../screens/HomePage/slice";
import { retrieveTopShops } from "../../screens/HomePage/selector";
import { Shop } from "../../../types/user";
import ShopApiService from "../../apiServices/shopApiService";
import { serverApi } from "../../../lib/config";


// REDUX SELECTOR
const topShopsRetriever = createSelector(retrieveTopShops, (topShops) => ({
  topShops,
}));


export function Brands() {
  // Initialization
  const { topShops } = useSelector(topShopsRetriever);

  console.log("topShops:::", topShops);
  return (
    <div className="brant_wrap">
      <Container sx={{ mt: "50px", mb: "50px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Top Brands</Box>
          <Box className="category_title_box">
            <Box className="more_than">
              <ListAltIcon style={{ height: "40px" }} />
              more than
            </Box>
          </Box>
          <Stack
            width={"100%"}
            height={"500px"}
            sx={{ mt: "20px" }}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Swiper
              className={"brand_info swiper_wrapper"}
              spaceBetween={0}
              slidesPerView={"auto"}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {topShops.map((ele: Shop) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide className={"brand_info_frame"}>
                    <CssVarsProvider key={ele._id}>
                      <Card
                        className="img_carts_brands"
                        variant="outlined"
                        sx={{
                          minHeight: 400,
                          minWidth: 310,
                          borderRadius: "0",
                        }}
                      >
                        <CardOverflow>
                          <AspectRatio ratio="1">
                            <img src={image_path} alt="" />
                          </AspectRatio>
                          <IconButton
                            aria-label="Like minimal phtography"
                            size="md"
                            variant="solid"
                            color="neutral"
                            className="like_hover"
                            sx={{
                              position: "absolute",
                              zIndex: 2,
                              borderRadius: "50%",
                              right: "1.2rem",
                              transform: "translateY(50%)",
                              color: "rgba(0,0,0,.2)",
                            }}
                          >
                            <Favorite
                              style={{
                                fill:
                                  ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                    ? "red"
                                    : "white",
                              }}
                            />
                          </IconButton>
                        </CardOverflow>
                        <Typography
                          level="h2"
                          sx={{
                            fontSize: "md",
                            lineHeight: "18px",
                            mt: "10px",
                          }}
                        >
                          {ele.mb_nick}
                        </Typography>
                        <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                          <Link
                            href=""
                            startDecorator={<LocationOnIcon />}
                            textColor="neutral.700"
                          >
                            {ele.mb_address}
                          </Link>
                        </Typography>
                        <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                          <Link
                            href=""
                            startDecorator={<LocalPhoneIcon />}
                            textColor="neutral.700"
                          >
                            {ele.mb_phone}
                          </Link>
                        </Typography>
                        <CardOverflow
                          variant="soft"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1.5,
                            py: 0.8,
                            // borderTop: ".4px solid",
                            // bgcolor: "Background.level1",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.400",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {ele.mb_views}
                            <Visibility
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                          <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                          <Typography
                            level="body-sm"
                            sx={{
                              fontSize: "md",
                              color: "neutral.400",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>{ele.mb_likes}</div>
                            <Favorite
                              sx={{ fontSize: 20, marginLeft: "5px" }}
                            />
                          </Typography>
                        </CardOverflow>
                      </Card>
                    </CssVarsProvider>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
