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
import { Close, Home } from "@mui/icons-material";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useHistory } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetShops } from "../../screens/ShopPage/selector";
import { Shop } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetShops } from "../../screens/ShopPage/slice";

const order_list = Array.from(Array(8).keys());
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetShops: (data: Shop[]) =>
    dispatch(setTargetShops(data)),
});
// REDUX SELECTOR
const targetShopsRetriever = createSelector(
  retrieveTargetShops,
  (targetShops) => ({
    targetShops,
  })
);

export function AllShops() {
  // INITIALIZATIONS
  const history = useHistory();
  const { setTargetShops } = actionDispatch(useDispatch());
  const { targetShops } = useSelector(targetShopsRetriever);
  return (
    <div className="all_shop">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/")} className="home_link">
              Shop
              <Close className="close" />
            </Box>
          </Box>
          <Box className={"fit_search_box"}>
            <Box className={"fit_box"}>
              <FormControl>
                <p color="black">Sorting</p>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue={"best"}
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
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
