import React, { useState } from "react";
import { Box, Button, Checkbox, Container, Stack } from "@mui/material";
import { Close, Home, RemoveRedEye } from "@mui/icons-material";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ReactImageMagnify from "react-image-magnify";
import { useHistory } from "react-router-dom";

const chosen_list = Array.from(Array(4).keys());
//  const [imgChange, setImgChange] = useState(0);
//  const wide_img = `${serverApi}/${chosenProduct?.product_images.filter(
//    (ele) => chosenProduct?.product_images.indexOf(ele) === imgChange
//  )}`;

export function ChosenProduct() {
  const history = useHistory();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
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
      <Container className="product_container">
        <Stack className="chosen_produc_wrap">
          <Box className="img_box">
            <img
              src="/shops/sneakers.jpg"
              className="img_selected"
              alt="product"
            />
            <img
              src="/shops/sneakers.jpg"
              className="img_selected"
              alt="product"
            />
            <img
              src="/shops/sneakers.jpg"
              className="img_selected"
              alt="product"
            />
            <img
              src="/shops/sneakers.jpg"
              className="img_selected"
              alt="product"
            />
            <img
              src="/shops/sneakers.jpg"
              className="img_selected"
              alt="product"
            />
          </Box>
          <Box className="main_img_box">
            <ReactImageMagnify
              className="selected_item"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: "/shops/sneakers.jpg",
                },
                largeImage: {
                  width: 2000,
                  height: 800,
                  src: "/shops/sneakers.jpg",
                },
              }}
            />
          </Box>
        </Stack>

        <Stack className="chosen_product_info_container">
          <Box className="chosen_product_info_box">
            <strong className="pro_txt">Nike air</strong>
            <span className="shop_name">Brand: Nike</span>
            <span className="shop_name">Size: 280</span>
            <span className="shop_name">Gender: Men</span>
            <span className="shop_name">Color: Red</span>
            <p className="pro_desc_info">
              Description: wow that are good shoes
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
                    checked={true}
                  />
                  <span>98 ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEye sx={{ mr: "10px" }} />
                  <span>1000 ta</span>
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
                  <span>$11</span>
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
      </Container>
    </div>
  );
}
