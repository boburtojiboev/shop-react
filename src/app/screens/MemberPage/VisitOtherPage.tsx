import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import {
  ArrowBack,
  ArrowForward,
  Close,
  Facebook,
  Home,
  Instagram,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { useHistory } from "react-router-dom";
import TViewer from "../../components/tuiEditor/TViewer";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticleObj } from "../../../types/boArticle";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "../../screens/MemberPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "../../screens/MemberPage/slice";
import MemberApiService from "../../apiServices/memberApiService";
import CommunityApiService from "../../apiServices/communityApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import FollowApiService from "../../apiServices/followApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});

// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);
export function VisitorOtherPage(props: any) {
  //** INITIALIZATIONS **//
  const history = useHistory();
  const { verifiedMemberData, chosen_mb_id, chosen_art_id } = props;
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = React.useState("1");
  const [memberAticleSearchObj, setMemberAticleSearchObj] =
    useState<SearchMemberArticleObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 4,
    });
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }

    const communityService = new CommunityApiService();
    if (chosen_art_id) {
      communityService
        .getChosenArticle(chosen_art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    }
    communityService
      .getMemberCommunityArticles(memberAticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
  }, [memberAticleSearchObj, chosen_mb_id, articlesRebuild]);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }

    const memberService = new MemberApiService();
    memberService
      .getChosenMember(memberAticleSearchObj.mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [verifiedMemberData, chosen_mb_id, followRebuild]);

  //** HANDLERS **//
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberAticleSearchObj.page = value;
    setMemberAticleSearchObj({ ...memberAticleSearchObj });
  };

  const renderChosenArticleHandeler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const subscribeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.subscribe(e.target.value);

      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const unsubscribeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(e.target.value);

      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="">
      <div className="mobile_version">
        <p> Mobile version is on developing process! Please use laptop</p>
      </div>
      <div className="my_page">
        <Container>
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/")} className="home_link">
              Members
              <Close className="close" />
            </Box>
          </Box>
        </Container>
        <Container maxWidth="lg" sx={{ mt: "20px", mb: "50px" }}>
          <Stack className="my_page_frame">
            <TabContext value={value}>
              <Stack className="left_my_page">
                <Box className="order_info_box">
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <div className="order_user_img">
                      <img
                        style={{ objectFit: "cover" }}
                        alt=""
                        src={
                          chosenMember?.mb_image
                            ? `${serverApi}/${chosenMember?.mb_image}`
                            : "/auth/default_user.svg"
                        }
                        className="order_user_avatar"
                      />
                      <div className="order_user_icon_box">
                        <img
                          src={
                            chosenMember?.mb_type === "SHOP"
                              ? "/icons/shop.svg"
                              : "/icons/user_icon.svg"
                          }
                        />
                      </div>
                    </div>
                    <span className="order_user_name">
                      {chosenMember?.mb_nick}
                    </span>
                    <span className="order_user_prof">
                      {chosenMember?.mb_type}
                    </span>
                  </Box>
                  <Box className="user_media_box">
                    <Facebook />
                    <Instagram />
                    <Telegram />
                    <YouTube />
                  </Box>
                  <Box className="user_media_box">
                    <p className="follows">
                      Followers: {chosenMember?.mb_subscriber_cnt}{" "}
                    </p>
                    <p className="follows">
                      Followings: {chosenMember?.mb_follow_cnt}{" "}
                    </p>
                  </Box>
                  <p className="user_desc">
                    {chosenMember?.mb_description ?? "No information"}
                  </p>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    sx={{ mt: "1px" }}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API example"
                    >
                      {chosenMember?.me_followed &&
                      chosenMember?.me_followed[0]?.my_following ? (
                        <Tab
                          style={{ flexDirection: "column" }}
                          value={"4"}
                          component={(e: any) => (
                            <Button
                              value={chosenMember?._id}
                              variant="contained"
                              style={{ backgroundColor: "#f70909bB" }}
                              onClick={unsubscribeHandler}
                            >
                              Cancel
                            </Button>
                          )}
                        />
                      ) : (
                        <Tab
                          style={{ flexDirection: "column" }}
                          value={"4"}
                          component={(e: any) => (
                            <Button
                              value={chosenMember?._id}
                              variant="contained"
                              style={{ backgroundColor: "#30945e" }}
                              onClick={subscribeHandler}
                            >
                              FOLLOW
                            </Button>
                          )}
                        />
                      )}
                    </TabList>
                  </Box>
                </Box>

                <Box className="my_page_menu">
                  <TabList
                    orientation={"vertical"}
                    variant={"scrollable"}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ width: "100%" }}
                  >
                    <Tab
                      value={"1"}
                      style={{ flexDirection: "column" }}
                      component={() => (
                        <div
                          className={`menu_box`}
                          onClick={() => setValue("1")}
                        >
                          <img src="/icons/post.svg" />
                          <span>Articles</span>
                        </div>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"2"}
                      component={() => (
                        <div
                          className={`menu_box`}
                          onClick={() => setValue("2")}
                        >
                          <img src="/icons/followers.svg" />
                          <span>Followers</span>
                        </div>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"3"}
                      component={() => (
                        <div
                          className={`menu_box`}
                          onClick={() => setValue("3")}
                        >
                          <img src="/icons/following.svg" />
                          <span>Following</span>
                        </div>
                      )}
                    />
                  </TabList>
                </Box>
              </Stack>

              <Stack className="right_my_page">
                <Box display="flex" flexDirection={"column"}>
                  <TabPanel value={"1"}>
                    <Box className="menu_name">Articles</Box>
                    <Box className="menu_content">
                      <MemberPosts
                        chosenMemberBoArticles={chosenMemberBoArticles}
                        renderChosenArticleHandeler={
                          renderChosenArticleHandeler
                        }
                        setArticlesRebuild={setArticlesRebuild}
                      />
                      <Stack
                        sx={{ my: "40px" }}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Box className="bottom_box">
                          <Pagination
                            count={
                              memberAticleSearchObj.page >= 3
                                ? memberAticleSearchObj.page + 1
                                : 3
                            }
                            page={memberAticleSearchObj.page}
                            renderItem={(item) => (
                              <PaginationItem
                                components={{
                                  previous: ArrowBack,
                                  next: ArrowForward,
                                }}
                                {...item}
                                color={"primary"}
                              />
                            )}
                            onChange={handlePaginationChange}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </TabPanel>

                  <TabPanel value={"2"}>
                    <Box className="menu_name">Followers</Box>
                    <Box className="menu_content">
                      <MemberFollowers
                        actions_enabled={false}
                        followRebuild={followRebuild}
                        setFollowRebuild={setFollowRebuild}
                        mb_id={chosen_mb_id}
                      />
                    </Box>
                  </TabPanel>

                  <TabPanel value={"3"}>
                    <Box className="menu_name">Following</Box>
                    <Box className="menu_content">
                      <MemberFollowing
                        actions_enabled={false}
                        followRebuild={followRebuild}
                        setFollowRebuild={setFollowRebuild}
                        mb_id={chosen_mb_id}
                      />
                    </Box>
                  </TabPanel>

                  <TabPanel value={"4"}>
                    <Box className="menu_name">Chosen article</Box>
                    <Box className="menu_content">
                      <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                    </Box>
                  </TabPanel>
                </Box>
              </Stack>
            </TabContext>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
