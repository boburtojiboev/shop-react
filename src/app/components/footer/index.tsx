import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack className={"main_footer_container"}>
          <Stack
            className="main_footer"
            flexDirection={"row"}
            style={{ height: "242px" }}
          >
            <Stack flexDirection={"column"} className="info">
              <Box>
                <h2 className="shoeker_footer">ShoekerShop</h2>
              </Box>
              <Box className="divider"></Box>
              <Box className={"main_text"}>Your choice matter</Box>
              <Box className={"main_text"}>Make comfort zone with good shoes</Box>
              <Stack className="contact_links">
                <Box>
                  <img src={"/icons/facebook.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/twitter.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/instagram.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/youtube.svg"} />
                </Box>
              </Stack>
            </Stack>

            <Stack className="parts">
              <Box className="parts_subject">Get to know</Box>
              <Box className="divider"></Box>
              <Box className="targets">
                <pre>Home</pre>
                <pre>Product</pre>
                <pre>Store</pre>
                <pre>Community</pre>
                <pre>Help</pre>
              </Box>
            </Stack>

            <Stack className="find_us">
              <Box className="find">Find us</Box>
              <Box className="divider"></Box>
              <Stack className="details" sx={{ mt: "10px" }}>
                <Box className="detail_first">Address</Box>
                <Box className="detail_second">USA NewYork 12</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "10px" }}>
                <Box className="detail_first">Phone</Box>
                <Box className="detail_second">+1345824733</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "10px" }}>
                <Box className="detail_first">Email</Box>
                <Box className="detail_second">shoekershop@shopping.com</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner"></Box>
          <Box className="copyrights">
            Copyright ShoekerShop 2024, All right reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
