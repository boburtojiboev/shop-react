import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { TextField, Stack, Fab } from "@mui/material";
import styled from "styled-components";
import { Login } from "@mui/icons-material";

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
  const classes = useStyles();
  const signUpOpen = false;
  const loginOpen = false;
  return (
    <div>
      {/*@ts-ignore */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signUpOpen}
        //close
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signUpOpen}>
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
        open={loginOpen}
        //close
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <img src="/auth/password.jpg" alt="camera" />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Login Form</h2>
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
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
