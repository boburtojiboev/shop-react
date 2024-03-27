import { Favorite, Visibility } from "@mui/icons-material";
import { CardOverflow, IconButton } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { AspectRatio, Link } from "@mui/joy";
import React, { useEffect, useRef } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestProducts } from "../../screens/HomePage/slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveBestProducts } from "./selector";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setBestProducts: (data: Product[]) => dispatch(setBestProducts(data)),
});

// REDUX SELECTOR
const bestProductsRetriever = createSelector(
  retrieveBestProducts,
  (bestProducts) => ({
    bestProducts,
  })
);

export function BestProducts() {
  // Initialization
  const history = useHistory();
  const { setBestProducts } = actionDispatch(useDispatch());
  const { bestProducts } = useSelector(bestProductsRetriever);

  console.log("bestProducts:::", bestProducts);
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getAllProducts({
        order: "product_likes",
        page: 1,
        limit: 4,
        product_size: "all",
        product_collection: "all",
      })
      .then((data) => {
        setBestProducts(data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refs: any = useRef([]);

  // HANDLERS//
  const chosenProductHandler = (id: string) => {
    history.push(`/store/product/${id}`);
  };
  const moreProductsHandler = () => {
    history.push(`/products`);
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
    } catch (err: any) {
      console.log("targetLikeTop, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="best_product_frame">
      <Container sx={{ mt: "60px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Best Products</Box>
          <Box className="category_title_box">
            <Box onClick={() => moreProductsHandler()} className="more_than">
              <ListAltIcon style={{ height: "40px" }} />
              more than
            </Box>
          </Box>
          <Stack
            sx={{ mt: "30px", gap: "40px" }}
            justifyContent={"space-between"}
            flexDirection={"row"}
            className="bestpro_stack"
          >
            {bestProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;
              return (
                <CssVarsProvider key={product._id}>
                  <Card
                    onClick={() => chosenProductHandler(product._id)}
                    className="img_cart"
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
                        {product.product_views}{" "}
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
                </CssVarsProvider>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
