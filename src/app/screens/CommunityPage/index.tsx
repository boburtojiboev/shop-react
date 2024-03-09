import { NavbarOthers } from "../../components/header/others";
import React, { useState } from "react";
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

const targetBoArticles = [1, 2, 3, 4];
export function CommunityPage() {
  /** INITIALIZATION **/
  const [value, setValue] = useState("1");
  const history = useHistory();

  /** HANDLERS *****/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    console.log(value);
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
                        <Tab label="Barcha Maqolalar" value="1"></Tab>
                        <Tab label="Mashhurlar" value="2"></Tab>
                        <Tab label="SHopga baho" value="3"></Tab>
                        <Tab label="Hikoyalar" value="4"></Tab>
                      </TabList>
                    </Box>
                  </Box>

                  <Box className="article_main" overflow={"hidden"}>
                    <TabPanel value="1">
                      <TargetArticles targetBoArticles={targetBoArticles} />
                    </TabPanel>
                    <TabPanel value="2">
                      <TargetArticles targetBoArticles={[1, 2, 3, 4, 5]} />
                    </TabPanel>
                    <TabPanel value="3">
                      <TargetArticles targetBoArticles={targetBoArticles} />
                    </TabPanel>
                    <TabPanel value="4">
                      <TargetArticles targetBoArticles={targetBoArticles} />
                    </TabPanel>
                  </Box>

                  <Box className="article_bott">
                    <Pagination
                      count={4}
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
