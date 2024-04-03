import {
  Card,
  CardOverflow,
  Typography,
  IconButton,
  AspectRatio,
  Link,
  CssVarsProvider,
} from "@mui/joy";
import { Box, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Call, Favorite, LocationOnRounded, } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Close, Home } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useHistory } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetShops } from "../../screens/ShopPage/selector";
import { Shop } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetShops } from "../../screens/ShopPage/slice";
import { SearchObj } from "../../../types/others";
import ShopApiService from "../../apiServices/shopApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { verifiedMemberData } from "../../apiServices/verify";

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
    const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
      page: 1,
      limit: 8,
      order: "mb_point",
    });
    const refs: any = useRef([]);

    useEffect(() => {
      const shopService = new ShopApiService();
      shopService
        .getShops(targetSearchObject)
        .then((data) => setTargetShops(data))
        .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetSearchObject]);

    /** HANDLERS */
    const chosenShopHandler = (id: string) => {
      history.push(`/store/${id}`);
    };

    const searchHandler = (category: string) => {
      targetSearchObject.page = 1;
      targetSearchObject.order = category;
      setTargetSearchObject({ ...targetSearchObject });
    };

    const handlePaginationChange = (event: any, value: number) => {
      targetSearchObject.page = value;
      setTargetSearchObject({ ...targetSearchObject });
    };
    const targetLikeHandler = async (e: any, id: string) => {
      try {
        assert.ok(verifiedMemberData, Definer.auth_err1);

        const memberService = new MemberApiService(),
          like_result: any = await memberService.memberLikeTarget({
            like_ref_id: id,
            group_type: "member",
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
            <Box className={"fit_box"} style={{ cursor: "pointer" }}>
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
                    label="Best"
                    onClick={() => searchHandler("mb_point")}
                  />
                  <FormControlLabel
                    value="famous"
                    control={<Radio />}
                    label="Famous"
                    onClick={() => searchHandler("mb_views")}
                  />
                  <FormControlLabel
                    value="tranding"
                    control={<Radio />}
                    label="Trand"
                    onClick={() => searchHandler("mb_likes")}
                  />
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="New"
                    onClick={() => searchHandler("createdAt")}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Stack className={"all_shop_box"}>
            <CssVarsProvider>
              {targetShops.map((ele: Shop) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <Card
                    onClick={() => chosenShopHandler(ele._id)}
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
                        <img src={image_path} loading="lazy" alt="" />
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Favorite
                          onClick={(e) => targetLikeHandler(e, ele._id)}
                          style={{
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                          }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography
                      level="h2"
                      sx={{ fontSize: "md", lineHeight: "18px", mt: "10px" }}
                    >
                      {ele.mb_nick} Store
                    </Typography>
                    <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRounded />}
                        textColor="neutral.700"
                      >
                        {ele.mb_address}
                      </Link>
                    </Typography>
                    <Typography textColor="neutral.700">
                      <Link
                        href=""
                        startDecorator={<Call />}
                        textColor="neutral.700"
                      >
                        {ele.mb_phone}
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
                        {ele.mb_views}
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
                        <div
                          ref={(element) => (refs.current[ele._id] = element)}
                        >
                          {ele.mb_likes}
                        </div>
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
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              }
              page={targetSearchObject.page}
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
              onChange={handlePaginationChange}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
