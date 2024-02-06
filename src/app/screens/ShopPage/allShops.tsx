import {
  Card,
  CardOverflow,
  Typography,
  IconButton,
  AspectRatio,
  Link,
  CssVarsProvider,
} from "@mui/joy";
import { Box, Button, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Call, Favorite, LocationOnRounded, Search } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const order_list = Array.from(Array(8).keys());
console.log(order_list);

export function AllShops() {
  return (
    <div className="all_shop">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"fit_search_box"}>
            <Box className={"fit_box"}>
              {/* <a>Zo'r</a>
              <a>Mashhur</a>
              <a>Trendagi</a>
              <a>Yangi</a> */}
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Sorting
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="best"
                    control={<Radio />}
                    label="best"
                  />
                  <FormControlLabel
                    value="famous"
                    control={<Radio />}
                    label="famous"
                  />
                  <FormControlLabel
                    value="tranding"
                    control={<Radio />}
                    label="tranding"
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="new"
                  />
                </RadioGroup>
              </FormControl>
              {/* <img className="line_img_left" src={"/icons/nike.png"} alt="" /> */}
             
            </Box>
          </Box>
          <Stack className={"all_shop_box"}>
            <CssVarsProvider>
              {order_list.map((ele) => {
                return (
                  <Card
                    className="shop_cart"
                    variant="outlined"
                    sx={{
                      transition: "0.2s",
                      borderRadius: "0",
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src="/shops/justdoit.jpeg" loading="lazy" alt="" />
                      </AspectRatio>

                      <IconButton
                        className="shop_like"
                        aria-label="Like animal phtography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1.2rem",
                          top: 1,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.2)",
                        }}
                      >
                        <Favorite style={{ color: "white" }} />
                      </IconButton>
                    </CardOverflow>
                    <Typography
                      level="h2"
                      sx={{ fontSize: "md", lineHeight: "18px", mt: "10px" }}
                    >
                      Shop Name
                    </Typography>
                    <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRounded />}
                        textColor="neutral.700"
                      >
                        Shop address
                      </Link>
                    </Typography>
                    <Typography textColor="neutral.700">
                      <Link
                        href=""
                        startDecorator={<Call />}
                        textColor="neutral.700"
                      >
                        Shop phone
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1.5,
                        py: 0.8,
                        // px: "var(--Card-padding)",
                        // borderTop: "1px solid",
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
                        10{" "}
                        <VisibilityIcon
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
                        <div>50</div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className="bottom_box">
            {/* <img className="line_img_left" src={"/icons/nike.png"} alt="" /> */}
            <Pagination
              count={3}
              page={1}
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
            />

            {/* <img className="line_img_right" src={"/icons/yellow.png"} alt="" /> */}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
