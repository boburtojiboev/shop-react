import React, { useEffect, useRef, useState } from "react";
import "../../../css/products.css";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
import { Favorite } from "@mui/icons-material";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { NavbarShop } from "../../components/header/shop";

// REDUX
import { setAllProducts } from "./slice";
import { Product } from "../../../types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveAllProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { AllProductsSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
SwiperCore.use([Autoplay, Navigation, Pagination]);
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setAllProducts: (data: Product[]) => dispatch(setAllProducts(data)),
});
// REDUX SELECTOR
const allProductsRetriever = createSelector(
  retrieveAllProducts,
  (allProducts) => ({
    allProducts,
  })
);


export function ProductsPage() {
  // INITIALIZATIONS
  const history = useHistory();
  const refs: any = useRef([]);
  const { setAllProducts } = actionDispatch(useDispatch());

  const { allProducts } = useSelector(allProductsRetriever);
  const [allProductSearchObj, setAllProductSearchObj] =
    useState<AllProductsSearchObj>({
      page: 1,
      limit: 9,
      order: "product_price",
      product_size: "all",  
      product_collection: "all",
    });
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getAllProducts(allProductSearchObj)
      .then((data) => setAllProducts(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProductSearchObj, productRebuild]);

  /** HANDLERS */
  const searchCollectionHandler = (product_collection: string) => {
    allProductSearchObj.page = 1;
    allProductSearchObj.product_collection = product_collection;
    setAllProductSearchObj({ ...allProductSearchObj });
  };
  const searchSizeHandler = (product_size: any) => {
    allProductSearchObj.page = 1;
    allProductSearchObj.product_size = product_size;
    setAllProductSearchObj({ ...allProductSearchObj });
  };


  const searchOrderHandler = (order: string) => {
    allProductSearchObj.page = 1;
    allProductSearchObj.order = order;
    setAllProductSearchObj({ ...allProductSearchObj });
  };

  const chosenProductHandler = (id: string) => {
    history.push(`/store/product/${id}`);
  };

  const allLikeTop = async (e: any, id: string) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("allLikeTop, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    allProductSearchObj.page = value;
    setAllProductSearchObj({ ...allProductSearchObj });
  };
  return (
    <div className="products_page">
      <NavbarShop />
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
                height={"1100px"}
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
                    defaultValue={"product_price"}
                  >
                    <FormControlLabel
                      value="product_price"
                      control={<Radio />}
                      label="Price"
                      onClick={() => searchOrderHandler("product_price")}
                    />
                    <FormControlLabel
                      value="product_discount"
                      control={<Radio />}
                      label="Sale"
                      onClick={() => searchOrderHandler("product_discount")}
                    />
                    <FormControlLabel
                      value="product_likes"
                      control={<Radio />}
                      label="Trend"
                      onClick={() => searchOrderHandler("product_likes")}
                    />
                    <FormControlLabel
                      value="product_views"
                      control={<Radio />}
                      label="View"
                      onClick={() => searchOrderHandler("product_views")}
                    />
                    <FormControlLabel
                      value="createdAt"
                      control={<Radio />}
                      label="New"
                      onClick={() => searchOrderHandler("createdAt")}
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
                    defaultValue={"all"}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                      onClick={() => searchCollectionHandler("all")}
                    />
                    <FormControlLabel
                      value="MAN"
                      control={<Radio />}
                      label="Men"
                      onClick={() => searchCollectionHandler("MEN")}
                    />
                    <FormControlLabel
                      value="WOMEN"
                      control={<Radio />}
                      label="Women"
                      onClick={() => searchCollectionHandler("WOMEN")}
                    />
                    <FormControlLabel
                      value="KIDS"
                      control={<Radio />}
                      label="Kids"
                      onClick={() => searchCollectionHandler("KIDS")}
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
                    defaultValue={"all"}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                      onClick={() => searchSizeHandler("all")}
                    />
                    <FormControlLabel
                      value="285"
                      control={<Radio />}
                      label="285"
                      onClick={() => searchSizeHandler(285)}
                    />
                    <FormControlLabel
                      value="280"
                      control={<Radio />}
                      label="280"
                      onClick={() => searchSizeHandler(280)}
                    />
                    <FormControlLabel
                      value="275"
                      control={<Radio />}
                      label="275"
                      onClick={() => searchSizeHandler(275)}
                    />
                    <FormControlLabel
                      value="270"
                      control={<Radio />}
                      label="270"
                      onClick={() => searchSizeHandler(270)}
                    />
                    <FormControlLabel
                      value="265"
                      control={<Radio />}
                      label="265"
                      onClick={() => searchSizeHandler(265)}
                    />
                    <FormControlLabel
                      value="260"
                      control={<Radio />}
                      label="260"
                      onClick={() => searchSizeHandler(260)}
                    />
                    <FormControlLabel
                      value="255"
                      control={<Radio />}
                      label="255"
                      onClick={() => searchSizeHandler(255)}
                    />
                    <FormControlLabel
                      value="250"
                      control={<Radio />}
                      label="250"
                      onClick={() => searchSizeHandler(250)}
                    />
                    <FormControlLabel
                      value="245"
                      control={<Radio />}
                      label="245"
                      onClick={() => searchSizeHandler("245")}
                    />
                    <FormControlLabel
                      value="240"
                      control={<Radio />}
                      label="240"
                      onClick={() => searchSizeHandler("240")}
                    />
                    <FormControlLabel
                      value="235"
                      control={<Radio />}
                      label="235"
                      onClick={() => searchSizeHandler("235")}
                    />
                    <FormControlLabel
                      value="230"
                      control={<Radio />}
                      label="230"
                      onClick={() => searchSizeHandler("230")}
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              <Stack
                className="main_box"
                display={"flex"}
                flexDirection={"column"}
                width={"76%"}
                minHeight={"1200px"}
              >
                <Stack className={"single_shop_box"}>
                  <CssVarsProvider>
                    {allProducts.map((product: Product) => {
                      const image_path = `${serverApi}/${product.product_images[0]}`;
                      return (
                        <Card
                          onClick={() => chosenProductHandler(product?._id)}
                          key={product._id}
                          className="img_carts"
                          variant="outlined"
                          sx={{ minHeight: 320, minWidth: 280 }}
                        >
                          <CardOverflow>
                            <AspectRatio ratio="1">
                              <img src={image_path} alt="" />
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
                              {product.product_discount} %
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
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Favorite
                                onClick={(e) => allLikeTop(e, product._id)}
                                style={{
                                  fill:
                                    product?.me_liked &&
                                    product?.me_liked[0]?.my_favorite
                                      ? "red"
                                      : "white",
                                }}
                              />
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
                            {product.product_name}
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
                              {product.product_price}
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
                              {product.product_colors}
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
                              {product.product_views}
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
                              <div
                                ref={(element) =>
                                  (refs.current[product._id] = element)
                                }
                              >
                                {product.product_likes}
                              </div>
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
                    count={
                      allProductSearchObj.page >= 3
                        ? allProductSearchObj.page + 1
                        : 3
                    }
                    page={allProductSearchObj.page}
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
                    onChange={handlePaginationChange}
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
