import React from "react";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import { Favorite, RemoveRedEye } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import moment from "moment";

export function TargetArticles(props: any) {
  return (
    <Stack flexDirection={"row"} gap={"40px"} flexWrap={"wrap"}>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/default_articles.svg";
        const image_path = article?.member_data.mb_image
          ? `${serverApi}/${article.member_data.mb_image}`
          : "/auth/default_user.svg";
        return (
          <Link
            className="all_article_box"
            sx={{ textDecoration: "none" }}
            href={``}
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${art_image_url})` }}
            ></Box>
            <Box className="all_article_container">
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src={image_path}
                  alt=""
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span
                  className="all_article_auth_user"
                  style={{ marginLeft: "10px" }}
                >
                  {article?.member_data.mb_nick}
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">{article?.bo_id}</span>
                <p className="all_article_desc">
                  {article?.art_subject}
                </p>
              </Box>
              <Box>
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                >
                  <Box className="article_share_main">
                    <span>{moment().format("YY-MM-DD HH:mm")}</span>
                    <Checkbox
                      sx={{ ml: "10px" }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article?._id}
                      /*@ts-ignore*/
                      checked={false}
                    />
                    <span style={{ margin: "0px 25px 0px 0px" }}>
                      {article?.art_likes}
                    </span>
                    <RemoveRedEye />
                    <span style={{ marginLeft: "10px" }}>
                      {article?.art_views}
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
