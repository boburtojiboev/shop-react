import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import Marginer from "../../components/marginer";
import { serverApi } from "../../../lib/config";
import Moment from "react-moment";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProductComment} from "./slice";
import { retrieveProductComment } from "./selector";


import { Comment } from "../../../types/comment";
import CommentApiService from "../../apiServices/commentApiService";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/Definer";
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setProductComment: (data: Comment[]) => dispatch(setProductComment(data)),
});
// REDUX SELECTOR
const productCommentRetriever = createSelector(
  retrieveProductComment,
  (productComment) => ({
    productComment,
  })
);

export function CommentPage({ chosenProduct }: any) {
  /*INITIALIZATIONS*/
  const { setProductComment } = actionDispatch(useDispatch());
  const { productComment } = useSelector(productCommentRetriever);
  const product_id = chosenProduct?._id;
  const [textValue, setTextValue] = useState("");
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  const comment_text = useRef<any>();
  useEffect(() => {
    const commentService = new CommentApiService();
    commentService
      .getTargetComment({
        page: 1,
        limit: 10,
        comment_ref_id: product_id,
      })
      .then((data) => setProductComment(data))
      .catch((err) => console.log(err));
  }, [product_id, productRebuild, setProductComment]);
  /*HANDLERS*/
  const submitHandler = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const reviewService = new CommentApiService();
      await reviewService.createComment({
        comment_ref_id: chosenProduct?._id,
        group_type: "product",
        content: comment_text.current.value,
      });
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
      setTextValue("");
    } catch (err) {
      console.log(err);
      textValue === ""
        ? sweetFailureProvider(Definer.input_err1)
        : sweetFailureProvider(Definer.auth_err1);
    }
  };
  return (
    <div className="single_div">
      <Container>
        <Stack className="commet_box">
          <h1 className="comment">Comment Part</h1>
          <Marginer direction="horizontal" height="1" width="100%" bg="#000" />
          {productComment.map((comment: any) => {
            const auth = comment?.member_data;
            const image_path = auth?.mb_image
              ? `${serverApi}/${auth?.mb_image}`
              : "/icons/user_avatar.jpg";
            return (
              <Box key={comment._id} className="comment_wrap">
                <Box className="comment_txt">
                  <img
                    src={image_path}
                    alt="product_image"
                    className="img_comment"
                  />
                  <span className="commenter">{auth?.mb_nick}</span>
                  <p className="comment_time">
                    <Moment fromNow>{comment.createdAt}</Moment>
                  </p>
                </Box>
                <Box className="comm_desc_box">
                  <span className="comment_des_txt">{comment.content}</span>
                </Box>
              </Box>
            );
          })}
        </Stack>
        {productComment.length === 0 && (
          <p>There aren't any comments for this product yet</p>
        )}
        <Box className="input_frame">
          <div className="long_input">
            <label className="spec_label">Add comment</label>
            <textarea
              placeholder={"comment"}
              name={"description"}
              className={"spec_textarea mb_description"}
              ref={comment_text}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          </div>
        </Box>
        <Box
          display="flex"
          justifyContent={"flex-end"}
          sx={{ mt: "25px", mb: "20px" }}
        >
          <Button onClick={submitHandler} variant="contained">
            Post
          </Button>
        </Box>
      </Container>
    </div>
  );
}
