import React, { useEffect, useRef, useState } from "react";
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
import { useParams } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenShop,
  retrieveRandomShops,
  retrieveTargetProducts,
} from "../../screens/ShopPage/selector";
import { Shop } from "../../../types/user";
import {
  setRandomShops,
  setChosenShop,
  setTargetProducts,
} from "../../screens/ShopPage/slice";
import { Dispatch } from "@reduxjs/toolkit";
import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import ShopApiService from "../../apiServices/shopApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setRandomShops: (data: Shop[]) => dispatch(setRandomShops(data)),
  setChosenShop: (data: Shop) => dispatch(setChosenShop(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

// REDUX SELECTOR
const randomShopsRetriever = createSelector(
  retrieveRandomShops,
  (randomShops) => ({
    randomShops,
  })
);
const chosenShopRetriever = createSelector(
  retrieveChosenShop,
  (chosenShop) => ({
    chosenShop,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

export function OneShop() {
  // INITIALIZATIONS
  const history = useHistory();
  const refs: any = useRef([]);
  let { shop_id } = useParams<{ shop_id: string }>();
  const { setRandomShops, setChosenShop, setTargetProducts } = actionDispatch(
    useDispatch()
  );
  const { randomShops } = useSelector(randomShopsRetriever);
  const { chosenShop } = useSelector(chosenShopRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [chosenShopId, setChosenShopId] = useState<string>(shop_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "product_price",
      shop_mb_id: shop_id,
      product_collection: "MEN"
    });

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const shopService = new ShopApiService();
    shopService
      .getShops({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomShops(data))
      .catch((err) => console.log(err));

    shopService
      .getChosenShop(chosenShopId)
      .then((data) => setChosenShop(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenShopId, targetProductSearchObj, productRebuild]);

  /** HANDLERS */
  const chosenShopHandler = (id: string) => {
    setChosenShopId(id);
    targetProductSearchObj.shop_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/store/${id}`);
  };
   const searchCollectionHandler = (product_collection: string) => {
     targetProductSearchObj.page = 1;
     targetProductSearchObj.product_collection =  product_collection;
     setTargetProductSearchObj({ ...targetProductSearchObj });
   };

   const searchOrderHandler = (order: string) => {
     targetProductSearchObj.page = 1;
     targetProductSearchObj.order = order;
     setTargetProductSearchObj({ ...targetProductSearchObj });
   };

   const chosenProductHandler = (id: string) => {
     history.push(`/store/product/${id}`);
   };

  const targetLikeTop = async (e: any, id: string) => {
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
      console.log("targetLikeTop, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
 const handlePaginationChange = (event: any, value: number) => {
   targetProductSearchObj.page = value;
   setTargetProductSearchObj({ ...targetProductSearchObj });
 };
  return (
    <div className="single_div">
      <div className="mobile_version">
        <p> Mobile version is on developing process! Please use laptop</p>
      </div>
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
                {randomShops.map((ele: Shop) => {
                  const image_path = `${serverApi}/${ele.mb_image}`;
                  return (
                    <SwiperSlide
                      onClick={() => chosenShopHandler(ele._id)}
                      style={{ cursor: "pointer" }}
                      key={ele._id}
                      className={"shop_avatars"}
                    >
                      <img src={image_path} alt="" />
                      <span>{ele.mb_nick}</span>
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
                <p>{chosenShop?.mb_nick} Store</p>
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
                    onClick={() => searchOrderHandler("product_price")}
                  />
                  <FormControlLabel
                    value="Sale"
                    control={<Radio />}
                    label="Sale"
                    onClick={() => searchOrderHandler("product_discount")}
                  />
                  <FormControlLabel
                    value="tranding"
                    control={<Radio />}
                    label="Tranding"
                    onClick={() => searchOrderHandler("product_likes")}
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="New"
                    onClick={() => searchOrderHandler("createdAt")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl style={{ width: "180px", marginLeft: "30px" }}>
                {" "}
                <p>Filter</p>
                <NativeSelect
                  defaultValue={"all"}
                  inputProps={{
                    name: "Filter",
                    id: "uncontrolled-native",
                  }}
                >
                  <option
                    value={"all"}
                    onClick={() => searchCollectionHandler("all")}
                  >
                    All
                  </option>
                  <option
                    value={"MEN"}
                    onClick={() => searchCollectionHandler("MEN")}
                  >
                    Men
                  </option>
                  <option
                    value={"WOMEN"}
                    onClick={() => searchCollectionHandler("WOMEN")}
                  >
                    Women
                  </option>
                  <option
                    value={"KIDS"}
                    onClick={() => searchCollectionHandler("KIDS")}
                  >
                    Kids
                  </option>
                </NativeSelect>
              </FormControl>
            </Stack>

            <Stack className={"single_shop_box"}>
              <CssVarsProvider>
                {targetProducts.map((product: Product) => {
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Card
                      onClick={() => chosenProductHandler(product?._id)}
                      key={product._id}
                      className="img_carts"
                      variant="outlined"
                      sx={{ minHeight: 320, minWidth: 280, mb: "50px" }}
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
                            onClick={(e) => targetLikeTop(e, product._id)}
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
                      <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                        <Link
                          href=""
                          startDecorator={<AttachMoneyIcon />}
                          textColor="neutral.700"
                        >
                          {product.product_price}
                        </Link>
                      </Typography>
                      <Typography level="body-md" sx={{ lineHeight: "10px" }}>
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
                count={
                  targetProductSearchObj.page >= 3
                    ? targetProductSearchObj.page + 1
                    : 3
                }
                page={targetProductSearchObj.page}
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
    </div>
  );
}
