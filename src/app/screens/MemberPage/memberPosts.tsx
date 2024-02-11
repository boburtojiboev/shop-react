import React from "react";
import moment from "moment";
import { Box, Checkbox, Stack } from "@mui/material";
// import { TabContext, TabList, TabPanel } from "@mui/lab"
// import Tab from "@mui/material/Tab"
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";

export function MemberPosts(props: any) {
  return (
    <Box className="post_content">
      {[1, 2, 3, 4].map((article) => {
        return (
          <Stack className="all_article_box" sx={{ cursor: "pointer" }}>
            <Box
              className="all_article_img"
              sx={{ backgroundImage: "url('/community/default_articles.svg')" }}
            ></Box>
            <Box className="all_article_container">
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src="/auth/default_user.svg"
                  width={"35px"}
                  alt=""
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className="all_article_author_user">Simon</span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">Evaluation</span>
                <p className="all_article_desc">Nike best brand</p>
              </Box>
              <Box>
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                  sx={{ mb: "10px" }}
                >
                  <Box
                    className="article_share_main"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>{moment().format("YY-MM-DD HH:mm")}</span>
                  </Box>
                  <Box
                    className="article_share_main"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      // sx={{ ml: "40px" }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      checked={false}
                    />
                    <span style={{ marginRight: "10px" }}>10</span>
                    <RemoveRedEye />
                    <span style={{ marginLeft: "10px" }}>100</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}
