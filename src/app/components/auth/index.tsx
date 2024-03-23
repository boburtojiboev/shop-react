import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { TextField, Stack, Fab } from "@mui/material";
import styled from "styled-components";
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

const modelling = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 5px;
  margin-left: 10px;
`;

export default function AuthentificationModal(props: any) {
  // INITIALIZATIONS
  const classes = useStyles();
  let mb_nick: string = "",
    mb_password: string = "",
    mb_phone: number = 0;

  /** HANDLERS */
  const handleUsername = (e: any) => {
    mb_nick = e.target.value;
  };
  const handlePhone = (e: any) => {
    mb_phone = e.target.value;
  };
  const handlePassword = (e: any) => {
    mb_password = e.target.value;
  };
  const handleLoginRequest = async () => {
    try {
      const is_fullfilled = mb_nick != "" && mb_password != "";
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
                //onchange
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
              />
              <TextField
                //onchange
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
              />
              <TextField
                //onchange
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="password"
                variant="outlined"
              />

              <Fab
                //onclick
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
