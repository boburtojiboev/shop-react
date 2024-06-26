import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function Statistics() {
  return (
    <div className="static_frame">
      <Container>
        <Stack
        className="statis_stock"
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          // style={{ height: "160px" }}
          // border={"2px solid green"}
        >
          <Box className={"statistic_inf"}>
            <div className="free_ship"></div>
            <Stack className="static_box">
              <Box className="static_num">
                <p>Fast Shipping</p>
              </Box>
              <Box className="static_text">NO need to worry about time</Box>
            </Stack>
          </Box>
          {/* <Marginer direction="vertical" height="80" width="2" bg="black" /> */}
          <Box className={"statistic_inf"}>
          <div className="pay_meth"></div>
          <Stack className="static_box">
            <Box className="static_num">
              <p>Payment Method</p>
            </Box>
            <Box className="static_text">
              Easy and hassle free online transaction
            </Box>
          </Stack>
          </Box>
          {/* <Marginer direction="vertical" height="80" width="2" bg="black" /> */}
           <Box className={"statistic_inf"}>
          <div className="online_sup"></div>
          <Stack className="static_box">
            <Box className="static_num">
              {" "}
              <p>Online Support</p>
            </Box>
            <Box className="static_text">24 hours a day, 7 days a week</Box>
          </Stack>
          </Box>
          {/* <Marginer direction="vertical" height="80" width="2" bg="black" /> */}
           <Box className={"statistic_inf"}>
          <div className="packaging"></div>
          <Stack className="static_box">
            <Box className="static_num">
              {" "}
              <p>Secure Packaging</p>
            </Box>
            <Box className="static_text">
              Every order packaging securely place
            </Box>
          </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
