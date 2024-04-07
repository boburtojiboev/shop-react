import React, { useEffect, useState } from "react";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { FollowSearchObj, Following } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveMemberFollowings } from "../../screens/MemberPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowings } from "../../screens/MemberPage/slice";
import { serverApi } from "../../../lib/config";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});

// REDUX SELECTOR
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

export function MemberFollowing(props: any) {
  /** INITIALIZATIONS **/
   const history = useHistory();
  const { mb_id, followRebuild, setFollowRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const [followingsSearchObj, setFollowingsSearchObj] =
    useState<FollowSearchObj>({ page: 1, limit: 5, mb_id: mb_id });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingsSearchObj, followRebuild, setMemberFollowings]);

  //** HANDLERS**//
  const handlePaginationChange = (event: any, value: number) => {
    followingsSearchObj.page = value;
    setFollowingsSearchObj({ ...followingsSearchObj });
  };

  const unsubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(id);

      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

    const visitMemberHandler = (mb_id: string) => {
      history.push(`/member-page/other?mb_id=${mb_id}`);
      // document.location.reload();
    };
  return (
    <Stack>
      {memberFollowings.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image
          ? `${serverApi}/${following.follow_member_data.mb_image}`
          : "/auth/default_user.svg";
        return (
          <Box className="follow_box">
            <Avatar
              alt={""}
              src={image_url}
              sx={{ width: 89, height: 89 }}
              style={{ cursor: "pointer" }}
              onClick={() => visitMemberHandler(following?.follow_id)}
            />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">
                {following?.follow_member_data?.mb_type}
              </span>
              <span
                className="name_text"
                style={{ cursor: "pointer" }}
                onClick={() => visitMemberHandler(following?.follow_id)}
              >
                {following?.follow_member_data?.mb_nick}
              </span>
            </div>
            {props.actions_enabled && (
              <Button
                onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                variant="contained"
                className="follow_cancel_btn"
                startIcon={
                  <img
                    src="/icons/follow_icon.svg"
                    alt=""
                    style={{ width: "40px", marginLeft: "16px" }}
                  />
                }
              >
                Cancel
              </Button>
            )}
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className="bottom_box">
          <Pagination
            count={
              followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3
            }
            page={followingsSearchObj.page}
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
    </Stack>
  );
}
