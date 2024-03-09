import { Box, Container,  Stack, } from "@mui/material";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";


export function Events() {
  return (
    // <div className="">
    //   <Container>Events</Container>
    // </div>
    <div className={"review_for_shop"}>
      <Container
        sx={{ mt: "60px" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box className="category_title_review">Events and Ceremony</Box>
        <Box className="category_title_box">
          <Box className="more_than">
            <ListAltIcon style={{ height: "40px" }} />
            more than
          </Box>
        </Box>
        <Stack
          flexDirection={"row"}
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          className="event_stack"
        >
          {Array.from(Array(4).keys()).map((ele, index) => {
            return (
              <Box className="review_box_review" key={`${index}`}>
                <Box display={"flex"} justifyContent={"center"}>
                  <img src="/shops/open.jpeg" className="review_img_review" />
                </Box>
                <span className="review_name_review">
                  Nike opening ceremony{" "}
                </span>
                {/* <p className="review_desc_rev">
                  Menga bu oshxonaning taomi juda yoqadi. Hammaga tavsiya
                  qilaman!!!
                </p>
                <span className="review_prof_rev">
                  <AccessTimeIcon
                    style={{
                      marginRight: "10px",
                      paddingTop: "10px",
                      width: "35pxpx",
                      height: "35px",
                    }}
                  />
                  2024.03.21
                </span> */}
                <span className="review_prof_rev">
                  <LocationOnIcon
                    style={{
                      marginRight: "10px",
                      paddingTop: "10px",
                      width: "35pxpx",
                      height: "35px",
                    }}
                  />
                  Busan South Korea
                </span>
                <Box className="details_box"><p>Details</p></Box>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}
