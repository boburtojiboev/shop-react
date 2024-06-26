import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

export function CollectionType() {
  // Initialization
  const history = useHistory();
   const moreProductsHandler = () => {
     history.push(`/products`);
   };
  return (
    <div className="collection_frame">
      <Container sx={{ padding: "0px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Collections Types</Box>
          <Stack
            className="image_box"
            sx={{ mt: "23px" }}
            flexDirection={"row"}
          >
            <Box className="collection_box">
              <Stack
                className="collection_img"
                sx={{
                  backgroundImage: `url("https://www.rankandstyle.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frns-dev%2Fmedia%2Flists%2Fm%2Fmens-office-sneakers.jpg&w=640&q=75")`,
                }}
              >
                <button
                  onClick={() => moreProductsHandler()}
                  className={"view_btn"}
                >
                  MAN
                </button>
              </Stack>
            </Box>

            <Box className="collection_box">
              <Stack
                className="collection_img"
                sx={{
                  backgroundImage: `url("https://www.jetsetter.com//uploads/sites/7/2018/05/K9LPCdvM.jpeg")`,
                }}
              >
                <button
                  onClick={() => moreProductsHandler()}
                  className={"view_btn"}
                >
                  WOMEN
                </button>
              </Stack>
            </Box>

            <Box className="collection_box">
              <Stack
                className="collection_img"
                sx={{
                  backgroundImage: `url("https://neutral.com/cdn/shop/products/O30001KidsT-shirt_DustyMint_White_804x.jpg?v=1672222201")`,
                }}
              >
                <button
                  onClick={() => moreProductsHandler()}
                  className={"view_btn"}
                >
                  KIDS
                </button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
