import { Avatar, Box, Button, Stack } from "@mui/material";

const followers = [
  { mb_nick: "Lucas", following: true },
  { mb_nick: "Ben", following: false },
  { mb_nick: "Devid", following: true },
];

export function MemberFollowers(props: any) {
  return (
    <Stack>
      {followers.map((follower) => {
        const image_url = "/auth/default_user.svg";
        return (
          <Box className="follow_box">
            <Avatar alt={""} src={image_url} sx={{ width: 89, height: 89 }} />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">USER</span>
              <span className="name_text">{follower.mb_nick}</span>
            </div>
            {props.actions_enabled &&
              (follower.following ? (
                <Button
                  variant="contained"
                  className="following_already"
                  disabled
                >
                  FOLLOWING
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={
                    <img
                      src="/icons/follow_icon.svg"
                      alt=""
                      style={{ width: "40px" }}
                    />
                  }
                  className="follow_btn"
                >
                  FOLLOW BACK
                </Button>
              ))}
          </Box>
        );
      })}
    </Stack>
  );
}
