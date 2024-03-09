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
          </Stack>

          <Stack className="commet_box">
            <h1 className="comment">Comment Part</h1>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000"
            />
            {Array.from(Array(5).keys()).map((ele, index) => {
              return (
                <Box className="comment_wrap">
                  <Box className="comment_txt">
                    <img
                      src={"/shops/sneakers.jpg"}
                      alt="product_image"
                      className="img_comment"
                    />
                    <span className="commenter">Commenter name</span>
                    <p className="comment_time">2days ago</p>
                  </Box>
                  <Box className="comm_desc_box">
                    <span className="comment_des_txt">Comment discription</span>
                  </Box>
                </Box>
              );
            })}
          </Stack>

          <Box className="input_frame">
            <div className="long_input">
              <label className="spec_label">Add comment</label>
              <textarea
                placeholder={"comment"}
                name={"description"}
                className={"spec_textarea mb_description"}
              />
            </div>
          </Box>
          <Box
            display="flex"
            justifyContent={"flex-end"}
            sx={{ mt: "25px", mb: "20px" }}
          >
            <Button variant="contained">Post</Button>
          </Box>
        </Container>
      </div>
    </div>
  );
}
