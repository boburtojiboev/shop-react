import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Container, Stack } from "@mui/material";
import { Close, Home, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ReactImageMagnify from "react-image-magnify";
import { useHistory, useParams } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { Product } from "../../../types/product";
import { Shop } from "../../../types/user";
import { useDispatch, useSelector } from "react-redux";
import ProductApiService from "../../apiServices/productApiService";
import ShopApiService from "../../apiServices/shopApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
// REDUX
import { createSelector } from "reselect";
import { setChosenProduct, setChosenShop,} from "./slice";
import { serverApi } from "../../../lib/config";
import { retrieveChosenProduct, retrieveChosenShop, } from "./selector";
import { CommentPage } from "./comment";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setChosenShop: (data: Shop) => dispatch(setChosenShop(data)),
});
// REDUX SELECTOR
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenShopRetriever = createSelector(
  retrieveChosenShop,
  (chosenShop) => ({
    chosenShop,
  })
);

export function ChosenProduct() {
  // INITIALIZATIONS
  const history = useHistory();
  let { product_id } = useParams<{ product_id: string }>();
  const { setChosenProduct, setChosenShop } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenShop } = useSelector(chosenShopRetriever);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const productRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      setChosenProduct(product);

      const shopService = new ShopApiService();
      const shop = await shopService.getChosenShop(product.shop_mb_id);
      setChosenShop(shop);
    } catch (err) {
      console.log(`productRelatedProcess ERROR:`, err);
    }
  };
  const [imgChange, setImgChange] = useState(0);
  const wide_img = `${serverApi}/${chosenProduct?.product_images.filter(
    (ele: string) => chosenProduct?.product_images.indexOf(ele) === imgChange
  )}`;

  /** HANDLERS */
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  useEffect(() => {
    productRelatedProcess().then();
  }, [productRebuild]);
  return (
    <div className="single_div">
      <div className="mobile_version">
        <p> Mobile version is on developing process! Please use laptop</p>
      </div>
      <div className="chosen_product_page">
        <Container>
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
              OneProduct
              <Close className="close" />
            </Box>
          </Box>
        </Container>
        <Container>
          <Stack className="product_container">
            <Stack className="chosen_produc_wrap">
              <Box className="img_box">
                {chosenProduct?.product_images.map((ele: string, id) => {
                  const image_path = `${serverApi}/${ele}`;
                  return (
                    <img
                      onMouseEnter={() => setImgChange(id)}
                      src={image_path}
                      key={id}
                      className="img_selected"
                      alt="product"
                      style={
                        imgChange === id
                          ? { border: " 2px solid #fc9823" }
                          : { border: " 2px solid #ffffff" }
                      }
                    />
                  );
                })}
              </Box>
              <Box className="main_img_box">
                <ReactImageMagnify
                  className="selected_item"
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: wide_img,
                    },
                    largeImage: {
                      width: 900,
                      height: 900,
                      src: wide_img,
                    },
                  }}
                />
              </Box>
            </Stack>

            <Stack className="chosen_product_info_container">
              <Box className="chosen_product_info_box">
                <strong className="pro_txt">
                  {chosenProduct?.product_name}
                </strong>
                <span className="shop_name">Brand: {chosenShop?.mb_nick}</span>
                <span className="shop_name">
                  Size: {chosenProduct?.product_size}
                </span>
                <span className="shop_name">
                  Gender: {chosenProduct?.product_collection}
                </span>
                <span className="shop_name">
                  Color: {chosenProduct?.product_colors}
                </span>
                <p className="shop_name">
                  Description: {chosenProduct?.product_description} This shoe is
                  a classic with a runway inspired look. It brings back the
                  shape that defined the era and was created by one of our most
                  famous designers. The large Air element ensures a casual look
                  and provides long-lasting comfort. keywords: Bremen, products,
                  for men, for women, watches text: Bremen offers high-quality
                  products at fair prices.
                </p>
                <Box className="rating_box">
                  <div className="evaluation_box">
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
                        id={chosenProduct?._id}
                        onClick={targetLikeProduct}
                        checked={
                          chosenProduct?.me_liked &&
                          chosenProduct?.me_liked[0]?.my_favorite
                        }
                      />
                      <span>{chosenProduct?.product_likes}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RemoveRedEye sx={{ mr: "10px" }} />
                      <span>{chosenProduct?.product_views}</span>
                    </div>
                  </div>
                </Box>
                <div className="produt_desc_bottom">
                  <Marginer
                    direction="horizontal"
                    height="1"
                    width="100%"
                    bg="#000"
                  />
                  <div className="bottom_price">
                    <div className="pro_price_box">
                      <span>Price:</span>
                      <span>${chosenProduct?.product_price}</span>
                    </div>
                    <div className="bottom_box">
                      <Button
                        style={{ backgroundColor: "#f0b512;" }}
                        variant="contained"
                      >
                        Add to box
                      </Button>
                    </div>
                  </div>
                </div>
              </Box>
            </Stack>
          </Stack>

          <CommentPage chosenProduct={chosenProduct} />

        </Container>
      </div>
    </div>
  );
}
