import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Checkbox, Container, Stack } from "@mui/material";
import Marginer from "../../components/marginer";

// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setEventComment} from "./slice";
import { retrieveEventComment } from "./selector";


import { Comment } from "../../../types/comment";
import CommentApiService from "../../apiServices/commentApiService";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/Definer";
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import Moment from "react-moment";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setEventComment: (data: Comment[]) => dispatch(setEventComment(data)),
});
// REDUX SELECTOR
const eventCommentRetriever = createSelector(
  retrieveEventComment,
  (eventComment) => ({
    eventComment,
  })
);

export function EventCommentPage({ chosenEvent }: any) {
  /*INITIALIZATIONS*/
  const { setEventComment } = actionDispatch(useDispatch());
  const { eventComment } = useSelector(eventCommentRetriever);
  const event_id = chosenEvent?._id;
  const [textValue, setTextValue] = useState("");
  const [eventRebuild, setEventRebuild] = useState<Date>(new Date());
  const comment_text = useRef<any>();
  useEffect(() => {
    const commentService = new CommentApiService();
    commentService
      .getTargetComment({
        page: 1,
        limit: 10,
        comment_ref_id: event_id,
      })
      .then((data) => setEventComment(data))
      .catch((err) => console.log(err));
  }, [event_id, eventRebuild]);
  /*HANDLERS*/
  const submitHandler = async () => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);
      const commentService = new CommentApiService();
      await commentService.createComment({
        comment_ref_id: chosenEvent?._id,
        group_type: "event",
        content: comment_text.current.value,
      });
      await sweetTopSmallSuccessAlert("success", 700, false);
      setEventRebuild(new Date());
      setTextValue("");
    } catch (err) {
      console.log(err);
      textValue === ""
        ? sweetFailureProvider(Definer.input_err1)
        : sweetFailureProvider(Definer.auth_err1);
    }
  };
  return (
    <div>
      <Stack className="commet_box">
        <h1 className="comment">Comment Part</h1>
        <Marginer direction="horizontal" height="1" width="100%" bg="#000" />
        {eventComment.map((comment: any) => {
          const auth = comment?.member_data;
          const image_path = auth?.mb_image
            ? `${serverApi}/${auth?.mb_image}`
            : "/icons/user_avatar.jpg";
          return (
            <Box key={comment._id} className="comment_wrap">
              <Box className="comment_txt">
                <img
                  src={"/shops/sneakers.jpg"}
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
      {eventComment.length === 0 && (
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
    </div>
  );
}
