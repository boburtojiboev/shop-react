import { Favorite, Visibility } from "@mui/icons-material";
import { CardOverflow, IconButton } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { AspectRatio, Link } from "@mui/joy";
import ListAltIcon from "@mui/icons-material/ListAlt";
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setSaleProducts } from "../../screens/HomePage/slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveSaleProducts } from "./selector";
import { createSelector } from "reselect";
import { serverApi } from "../../../lib/config";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setSaleProducts: (data: Product[]) => dispatch(setSaleProducts(data)),
});

// REDUX SELECTOR
const saleProductsRetriever = createSelector(
  retrieveSaleProducts,
  (saleProducts) => ({
    saleProducts,
  })
);

export function BigSales() {
  // Initialization
  const { setSaleProducts } = actionDispatch(useDispatch());
  const { saleProducts } = useSelector(saleProductsRetriever);

  console.log("saleProducts:::", saleProducts);
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getProducts({ order: "product_discount", page: 1, limit: 4 })
      .then((data) => {
        setSaleProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="big_sale_frame">
      <Container sx={{ pt: "30px", mb: "0px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Big sale</Box>
          <Box className="category_title_box">
            <Box className="more_than">
              <ListAltIcon style={{ height: "40px" }} />
              more than
            </Box>
          </Box>
          <Stack
            sx={{ mt: "30px", mb: "50px", gap: "40px" }}
            justifyContent={"space-between"}
            flexDirection={"row"}
            className="big_sale_stack"
          >
             {saleProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;
              return (
                <CssVarsProvider key={product._id}>
                  <Card
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
                        {product.product_likes}{" "}
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
                        <div>{product.product_views}</div>
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
