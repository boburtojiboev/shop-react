import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { TextField, Stack, Fab } from "@mui/material";
import { Login } from "@mui/icons-material";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

export default function AuthentificationModal(props: any) {
  // INITIALIZATIONS
  const classes = useStyles();
      const [mb_nick, set_mb_nick] = useState<string>("");
      const [mb_phone, set_mb_phone] = useState<number>(0);
      const [mb_password, set_mb_password] = useState<string>("");

  /** HANDLERS */
  const handleUsername = (e: any) => {
    set_mb_nick(e.target.value);
  };
  const handlePhone = (e: any) => {
    set_mb_phone(e.target.value);
  };
  const handlePassword = (e: any) => {
    set_mb_password(e.target.value);
  };
  const handleSignupRequest = async () => {
    try {
      const is_fullfilled =
        mb_nick !== "" && mb_password !== "" && mb_phone !== 0;
      assert.ok(is_fullfilled, Definer.input_err1);

      const sign_data = {
        mb_nick: mb_nick,
        mb_phone: mb_phone,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.signupRequest(sign_data);

      props.handleSignupClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handleLoginRequest = async () => {
    try {
      const is_fullfilled = mb_nick !== "" && mb_password !== "";
      assert.ok(is_fullfilled, Definer.input_err1);

      const login_data = {
        mb_nick: mb_nick,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);

      props.handleLoginClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      props.handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

    const passwordKeyPressHandler = (e: any) => {
      if (e.key === "Enter" && props.signupOpen) {
        handleSignupRequest().then();
      } else if (e.key === "Enter" && props.loginOpen) {
        handleLoginRequest().then();
      }
    };
  return (
    <div>
      {/*@ts-ignore */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.signupOpen}
        onClose={props.handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <img src="/auth/password.jpg" alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                onChange={handleUsername}
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
              />
              <TextField
                onChange={handlePhone}
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
              />
              <TextField
                onChange={handlePassword}
                onKeyPress={passwordKeyPressHandler}
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="password"
                variant="outlined"
              />

              <Fab
                onClick={handleSignupRequest}
                sx={{ mt: "30px", width: "120px" }}
                variant="extended"
                color="primary"
              >
                <Login sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
      {/*@ts-ignore */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.loginOpen}
        onClose={props.handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <img src="/auth/password.jpg" alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Login Form</h2>
              <TextField
                onChange={handleUsername}
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
              />
              <TextField
                onChange={handlePassword}
                onKeyPress={passwordKeyPressHandler}
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="password"
                variant="outlined"
              />

              <Fab
                onClick={handleLoginRequest}
                sx={{ mt: "30px", width: "120px" }}
                variant="extended"
                color="primary"
              >
                <Login sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
