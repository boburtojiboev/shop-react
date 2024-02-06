import React from "react";
import { Favorite, Visibility } from "@mui/icons-material";
import { CardOverflow, IconButton } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { AspectRatio, Link } from "@mui/joy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

export function Brands() {
   const events_list = [
     {
       name: "Adidas",
       Phone: "012232885",
       address: "Seoul S.Korea",
       like: "22",
       view: "57",
       img: "/shops/1.png",
     },
     {
       name: "Nike",
       Phone: "012232885",
       address: "Deagu S.Korea",
       like: "26",
       view: "30",
       img: "/shops/6.webp",
     },

     {
       name: "Puma",
       Phone: "012232885",
       address: "Busan S.Korea",
       like: "30",
       view: "53",
       img: "/shops/3.webp",
     },
     {
       name: "Rebook",
       Phone: "012232885",
       address: "Seoul S.Korea",
       like: "21",
       view: "50",
       img: "/shops/4.png",
     },
     {
       name: "Supreme",
       Phone: "012232885",
       address: "Incheon S.Korea",
       like: "21",
       view: "56",
       img: "/shops/2.png",
     },
   ];
  return (
    <div className="">
      <Container sx={{mt: "50px",  mb: "50px" }}>
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
            sx={{ mt: "20px", gap: "40px" }}
            justifyContent={"space-between"}
            flexDirection={"row"}
          >
            <Swiper
              className={"brand_info swiper_wrapper"}
              spaceBetween={0}
              slidesPerView={3}
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {events_list.map((value, number) => {
                return (
                  <SwiperSlide className={"brand_info_frame"}>
                    <CssVarsProvider>
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
                            <img src={value.img} alt="" />
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
                            <Favorite style={{ color: "white" }} />
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
                          {value.name}
                        </Typography>
                        <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                          <Link
                            href=""
                            startDecorator={<LocationOnIcon />}
                            textColor="neutral.700"
                          >
                            {value.address}
                          </Link>
                        </Typography>
                        <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                          <Link
                            href=""
                            startDecorator={<LocalPhoneIcon />}
                            textColor="neutral.700"
                          >
                            {value.Phone}
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
                            {value.view}
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
                            <div>{value.like}</div>
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
