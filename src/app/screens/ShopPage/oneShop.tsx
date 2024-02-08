import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardOverflow,
  Typography,
  IconButton,
  AspectRatio,
  Link,
  CssVarsProvider,
} from "@mui/joy";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Close, Home, Visibility } from "@mui/icons-material";
import NativeSelect from "@mui/material/NativeSelect";
import { Favorite } from "@mui/icons-material";
import SwiperCore, { Autoplay, Navigation } from "swiper";
// SwiperCore.use([Autoplay, Navigation, Pagination]);

const shop_list = Array.from(Array(12).keys());
const product_list = Array.from(Array(8).keys());

export function OneShop() {
  const history = useHistory();
  return (
    <div className="single_shop">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/store")} className="home_link">
              Shop{" "}
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/store")} className="home_link">
              Product
              <Close className="close" />
            </Box>
          </Box>
          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className="prev_btn shop-prev">
              <ArrowBackIosIcon
                sx={{ fontSize: 40 }}
                style={{ color: "black" }}
              />
            </Box>
            <Swiper
              className="shop_avatars_wrapper"
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".shop-next",
                prevEl: ".shop-prev",
              }}
            >
              {shop_list.map((ele, index) => {
                return (
                  <SwiperSlide
                    style={{ cursor: "pointer" }}
                    key={index}
                    className={"shop_avatars"}
                  >
                    <img src="/shops/justdoit.jpeg" alt="" />
                    <span>Shop name</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box className="next_btn shop-next" style={{ color: "black" }}>
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>
          <Stack className={"avatar_big_box"}>
            <Box className={"top_text"}>
              <p>Shop Name</p>
              <Box className={"Single_search_big_box"}>
                <form className={"Single_search_form"} action={""} method={""}>
                  <input
                    type="search"
                    className="Single_searchInput"
                    name="Single_resSearch"
                    placeholder="Qidiruv"
                  />
                  <Button
                    className="Single_button_search"
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Izlash
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
            width={"100%"}
            sx={{ mt: "65px", color: "black" }}
          >
            <FormControl>
              <p color="black">Sorting</p>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={"Price"}
              >
                <FormControlLabel
                  value="Price"
                  control={<Radio />}
                  label="Price"
                />
                <FormControlLabel
                  value="Sale"
                  control={<Radio />}
                  label="Sale"
                />
                <FormControlLabel
                  value="tranding"
                  control={<Radio />}
                  label="tranding"
                />
                <FormControlLabel value="new" control={<Radio />} label="new" />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ width: "180px", marginLeft: "30px" }}>
              {" "}
              <p>Filter</p>
              <NativeSelect
                defaultValue={"All"}
                inputProps={{
                  name: "Filter",
                  id: "uncontrolled-native",
                }}
              >
                <option value={"All"}>All</option>
                <option value={"Men"}>Men</option>
                <option value={"Women"}>Women</option>
                <option value={"Kids"}>Kids</option>
              </NativeSelect>
            </FormControl>
          </Stack>

          <Stack className={"single_shop_box"}>
            <CssVarsProvider>
              {product_list.map((ele) => {
                return (
                  <Card
                    className="img_carts"
                    variant="outlined"
                    sx={{ minHeight: 320, minWidth: 280, mb: "50px" }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={"/shops/sneakers.jpg"} alt="" />
                      </AspectRatio>
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 5,
                          left: "0rem",
                          transform: "translateY(50%)",
                          color: "#ffffff",
                          backgroundColor: "red",
                          borderRadius: "0",
                        }}
                      >
                        -100%
                      </Box>
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
                          right: "1rem",
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.2)",
                        }}
                      >
                        <Favorite style={{ color: "white" }} />
                      </IconButton>
                      <IconButton
                        aria-label="Like minimal phtography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        className="like_hover"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          top: 45,
                          borderRadius: "50%",
                          right: "1rem",
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.2)",
                        }}
                      >
                        <LocalMallIcon style={{ color: "white" }} />
                      </IconButton>
                    </CardOverflow>
                    <Typography
                      level="h3"
                      sx={{ fontSize: "md", lineHeight: "10px", mt: "1" }}
                    >
                      ProductName
                    </Typography>
                    <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                      <Link
                        href=""
                        startDecorator={<AttachMoneyIcon />}
                        textColor="neutral.700"
                      >
                        Price
                      </Link>
                    </Typography>
                    <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                      <Link
                        href=""
                        startDecorator={<ColorLensIcon />}
                        textColor="neutral.700"
                      >
                        color
                      </Link>
                    </Typography>
                    <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5,
                        py: 0.8,
                        borderTop: ".4px solid",
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
                        100{" "}
                        <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
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
                        <div>500</div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className="bottom_box">
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      <Container className="member_reviews">
        <Stack
          style={{
            display: "felx",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className="category_title">Shop Address </Box>
          <iframe
            style={{ marginTop: "40px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
            width={"1320"}
            height={"500"}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
