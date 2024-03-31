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
import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
import TViewer from "../../components/tuiEditor/TViewer";
import { useHistory } from "react-router-dom";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticleObj } from "../../../types/boArticle";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
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
export function VisitMyPage(props: any) {
  //** INITIALIZATIONS **//
    const { verifiedMemberdata } = props;
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
  const history = useHistory();
   const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
   const [memberAticleSearchObj, setMemberAticleSearchObj] =
     useState<SearchMemberArticleObj>({ mb_id: "none", page: 1, limit: 3 });

   useEffect(() => {
     if (!localStorage.getItem("member_data")) {
       sweetFailureProvider("Please login first!!!", true, true);
     }

     const communityService = new CommunityApiService();
     communityService
       .getMemberCommunityArticles(memberAticleSearchObj)
       .then((data) => setChosenMemberBoArticles(data))
       .catch((err) => console.log(err));

     const memberService = new MemberApiService();
     memberService
       .getChosenMember(verifiedMemberdata?._id)
       .then((data) => setChosenMember(data))
       .catch((err) => console.log(err));
   }, [memberAticleSearchObj, articlesRebuild]);
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
        .then((data) => setChosenSingleBoArticle(data))
        .catch((err) => console.log(err));
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
              Member
              <Close className="close" />
            </Box>
          </Box>
        </Container>
        <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
          <Stack className="my_page_frame">
            <TabContext value={value}>
              <Stack className="left_my_page">
                <Box className="order_info_box">
                  <a onClick={() => setValue("6")} className="settings_btn">
                    <SettingsIcon />
                  </a>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <div className="order_user_img">
                      <img
                        style={{ objectFit: "cover" }}
                        src="/auth/default_user.svg"
                        className="order_user_avatar"
                      />
                      <div className="order_user_icon_box">
                        <img src="/icons/user_icon.svg" />
                      </div>
                    </div>
                    <span className="order_user_name">Simon</span>
                    <span className="order_user_prof">USER</span>
                  </Box>
                  <Box className="user_media_box">
                    <Facebook />
                    <Instagram />
                    <Telegram />
                    <YouTube />
                  </Box>
                  <Box className="user_media_box">
                    <p className="follows">Followers: 3</p>
                    <p className="follows">Followings: 2</p>
                  </Box>
                  <p className="user_desc">"no information"</p>
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    sx={{ mt: "1px" }}
                  >
                    <TabList onChange={handleChange}>
                      <Tab
                        style={{ flexDirection: "column" }}
                        value="4"
                        component={() => (
                          <Button
                            variant="contained"
                            onClick={() => setValue("4")}
                          >
                            Write Article
                          </Button>
                        )}
                      />
                    </TabList>
                  </Box>
                </Box>

                <Box className="my_page_menu">
                  <TabList
                    onChange={handleChange}
                    aria-label="tabs API tabs example"
                  >
                    <Tab
                      value={"1"}
                      style={{ flexDirection: "column" }}
                      component={() => (
                        <div
                          className={`menu_box ${value}`}
                          onClick={() => setValue("1")}
                        >
                          <img src="/icons/post.svg" />
                          <span>My Articles</span>
                        </div>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"2"}
                      component={() => (
                        <div
                          className={`menu_box ${value}`}
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
                          className={`menu_box ${value}`}
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
                    <Box className="menu_name">My Articles</Box>
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
                            count={3}
                            page={1}
                            renderItem={(item) => (
                              <PaginationItem
                                components={{
                                  previous: ArrowBack,
                                  next: ArrowForward,
                                }}
                                {...item}
                                color={"secondary"}
                              />
                            )}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </TabPanel>

                  <TabPanel value={"2"}>
                    <Box className="menu_name">Followers</Box>
                    <Box className="menu_content">
                      <MemberFollowers actions_enabled={true} />
                      <Stack
                        sx={{ my: "40px" }}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Box className="bottom_box">
                          <Pagination
                            count={3}
                            page={1}
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
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </TabPanel>

                  <TabPanel value={"3"}>
                    <Box className="menu_name">Following</Box>
                    <Box className="menu_content">
                      <MemberFollowing actions_enabled={true} />
                      <Stack
                        sx={{ my: "40px" }}
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Box className="bottom_box">
                          <Pagination
                            count={3}
                            page={1}
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

                  <TabPanel value={"4"}>
                    <Box className="menu_name">Write Article</Box>
                    <Box className="write_content">
                      <TuiEditor />
                    </Box>
                  </TabPanel>

                  <TabPanel value={"5"}>
                    <Box className="menu_name">Chosen Article</Box>
                    <Box className="menu_content">
                      <TViewer text={`<h3>Hello</h3>`} />
                    </Box>
                  </TabPanel>

                  <TabPanel value={"6"}>
                    <Box className="menu_name">Edit personal information</Box>
                    <Box className="menu_content">
                      <MySettings />
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
