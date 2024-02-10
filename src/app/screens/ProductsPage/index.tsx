import React from "react";
import "../../../css/products.css";
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
import { NavbarShop } from "../../components/header/shop";
SwiperCore.use([Autoplay, Navigation, Pagination]);

const shop_list = Array.from(Array(12).keys());
const product_list = Array.from(Array(9).keys());

export function ProductsPage() {
  const history = useHistory();
  return (
    <div className="products_page">
      <NavbarShop/>
      <div className="product_page">
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Box className="box_link">
              <Box onClick={() => history.push("/")} className="home_link">
                <Home />
                Home
              </Box>
              <p className="">/</p>
              <Box onClick={() => history.push("/")} className="home_link">
                Products
                <Close className="close" />
              </Box>
            </Box>

            <Stack className={"avatar_big_box"}>
              <Box className={"top_text"}>
                <p>All Products</p>
                <Box className={"Single_search_big_box"}>
                  <form
                    className={"Single_search_form"}
                    action={""}
                    method={""}
                  >
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
              mt={"50px"}
              gap={"40px"}
            >
              <Stack
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                width={"22%%"}
                sx={{ color: "black" }}
                className="sorting_box"
              >
                <Box color="black" className="sortin_top">
                  Default Sorting
                </Box>
                <FormControl className="filter_box">
                  <RadioGroup
                    aria-labelledby=""
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
                      value="Trend"
                      control={<Radio />}
                      label="Trend"
                    />
                    <FormControlLabel
                      value="View"
                      control={<Radio />}
                      label="View"
                    />
                    <FormControlLabel
                      value="New"
                      control={<Radio />}
                      label="New"
                    />
                  </RadioGroup>
                </FormControl>
                <Box color="black" className="sortin_top">
                  Product Gender
                </Box>
                <FormControl className="filter_box">
                  <RadioGroup
                    aria-labelledby=""
                    name="row-radio-buttons-group"
                    defaultValue={"All"}
                  >
                    <FormControlLabel
                      value="All"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="Men"
                      control={<Radio />}
                      label="Men"
                    />
                    <FormControlLabel
                      value="Women"
                      control={<Radio />}
                      label="Women"
                    />
                    <FormControlLabel
                      value="Kids"
                      control={<Radio />}
                      label="Kids"
                    />
                  </RadioGroup>
                </FormControl>
                <Box color="black" className="sortin_top">
                  Filter Size
                </Box>
                <FormControl className="filter_box">
                  <RadioGroup
                    aria-labelledby=""
                    name="row-radio-buttons-group"
                    defaultValue={"All"}
                  >
                    <FormControlLabel
                      value="All"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="270-285"
                      control={<Radio />}
                      label="270-285"
                    />
                    <FormControlLabel
                      value="260-270"
                      control={<Radio />}
                      label="260-270"
                    />
                    <FormControlLabel
                      value="245-260"
                      control={<Radio />}
                      label="245-260"
                    />
                    <FormControlLabel
                      value="230-245"
                      control={<Radio />}
                      label="230-245"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              <Stack display={"flex"} flexDirection={"column"} width={"76%"}>
                <Stack className={"single_shop_box"}>
                  <CssVarsProvider>
                    {product_list.map((ele) => {
                      return (
                        <Card
                          className="img_carts"
                          variant="outlined"
                          sx={{ minHeight: 320, minWidth: 280 }}
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
                          <Typography
                            level="body-md"
                            sx={{ lineHeight: "10px" }}
                          >
                            <Link
                              href=""
                              startDecorator={<AttachMoneyIcon />}
                              textColor="neutral.700"
                            >
                              Price
                            </Link>
                          </Typography>
                          <Typography
                            level="body-md"
                            sx={{ lineHeight: "10px" }}
                          >
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
                              <div>500</div>
                              <Favorite
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
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
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
