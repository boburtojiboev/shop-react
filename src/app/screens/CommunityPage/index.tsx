import { NavbarOthers } from "../../components/header/others";
import React, { useState, useEffect } from "react";
import { Box, Container, PaginationItem, Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";
import "../../../css/community.css";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabPanel } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TargetArticles } from "./targetArticles";
import { Close, Home } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetBoArticles } from "../../screens/CommunityPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetBoArticles } from "../../screens/CommunityPage/slice";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});

// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  })
);

export function CommunityPage() {
  /** INITIALIZATION **/
    const { setTargetBoArticles } = actionDispatch(useDispatch());
    const { targetBoArticles } = useSelector(targetBoArticlesRetriever);
  const [value, setValue] = useState("1");
  const history = useHistory();
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    {
      bo_id: "all",
      page: 1,
      limit: 5,
    }
  );
   const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => setTargetBoArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj, articlesRebuild]);

  /** HANDLERS *****/
  const handleChange = (event: any, newValue: string) => {
        searchArticlesObj.page = 1;
        switch (newValue) {
          case "1":
            searchArticlesObj.bo_id = "all";
            break;
          case "2":
            searchArticlesObj.bo_id = "celebrity";
            break;
          case "3":
            searchArticlesObj.bo_id = "evaluation";
            break;
          case "4":
            searchArticlesObj.bo_id = "story";
            break;
        }
        setSearchArticlesObj({ ...searchArticlesObj });
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
       searchArticlesObj.page = value;
       setSearchArticlesObj({ ...searchArticlesObj });
  };
  return (
    <div>
      <NavbarOthers />
      <div className="mobile_version">
        <p> Mobile version is on developing process! Please use laptop</p>
      </div>
      <div className="community_page">
        <Container>
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/")} className="home_link">
              Community
              <Close className="close" />
            </Box>
          </Box>
        </Container>

        <div className="community_frame">
          <Container sx={{ mb: "50px" }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Stack className="community_all_frame" inputMode={"text"}>
                <TabContext value={value}>
                  <Box className="article_tabs">
                    <Box
                      sx={{
                        width: "100%",
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs exampl"
                      >
                        <Tab label="All" value="1"></Tab>
                        <Tab label="Celebrity" value="2"></Tab>
                        <Tab label="Evaluation" value="3"></Tab>
                        <Tab label="story" value="4"></Tab>
                      </TabList>
                    </Box>
                  </Box>

                  <Box className="article_main" overflow={"hidden"}>
                    <TabPanel value="1">
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                      />
                    </TabPanel>
                    <TabPanel value="3">
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                      />
                    </TabPanel>
                    <TabPanel value="4">
                      <TargetArticles
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                      />
                    </TabPanel>
                  </Box>

                  <Box className="article_bott">
                    <Pagination
                      count={
                        searchArticlesObj.page >= 3
                          ? searchArticlesObj.page + 1
                          : 3
                      }
                      page={searchArticlesObj.page}
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
                  </Box>
                </TabContext>
              </Stack>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  );
}
