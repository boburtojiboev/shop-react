import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Stack } from "@mui/joy";
import { Send } from "@mui/icons-material";
import { Dropdown } from "antd";
import ChatIcon from "@mui/icons-material/Chat";
import { Avatar } from "@mui/material";
import { SocketContext } from "../../context/socket";
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others";
import { verifiedMemberData } from "../../apiServices/verify";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import { RippleBadge } from "../../MaterialTheme/styled";

const NewMessage = (data: any) => {
  console.log(data.new_message);
  if (data.new_message.mb_id === verifiedMemberData?.mb_id) {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        sx={{ m: "10px 0px" }}
      >
        <div className="msg_right">{data.new_message.msg}</div>
      </Box>
    );
  } else {
    return (
      <Box
        flexDirection={"row"}
        style={{ display: "flex" }}
        sx={{ m: "10px 0px" }}
      >
        <Avatar
          alt={data.new_message.mb_nick}
          src={data.new_message.mb_image}
        />
        <div className="msg_left">{data.new_message.msg}</div>
      </Box>
    );
  }
};
export function Chatting() {
  /** Initializations */
  const [messagesList, setMessagesList] = useState([]);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const textInput: any = useRef(null);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    socket.connect();
    console.log("printed");

    socket?.on("connect", () => {
      console.log("Client: connected");
    });

    socket.on("newMsg", (new_message: ChatMessage) => {
      console.log("Client: new message");
      messagesList.push(
        // @ts-ignore
        <NewMessage new_message={new_message} key={messagesList.length} />
      );
      setMessagesList([...messagesList]);
    });
    socket.on("greetMsg", (msg: ChatGreetMsg) => {
      console.log("Client: greet message");
      messagesList.push(
        // @ts-ignore
        <p
          style={{
            textAlign: "center",
            fontSize: "large",
            fontFamily: "serif",
          }}
        >
          {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}!
        </p>
      );
      setMessagesList([...messagesList]);
    });
    socket.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("Client: info message");
      setOnlineUsers(msg.total);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  /** HANDLERS */
  const getInputMessageHandler = useCallback(
    (e: any) => {
      const text = e.target.value;
      setMessage(text);
    },
    [message]
  );

  const getKeyHandler = (e: any) => {
    try {
      if (e.key === "Enter") {
        assert.ok(message, Definer.input_err3);
        onClickHandler();
      }
    } catch (err) {
      console.log("getKeyHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const onClickHandler = () => {
    try {
      if (!verifiedMemberData) {
        textInput.current.value = "";
        sweetFailureProvider("Please login first!", true);
        return false;
      }
      textInput.current.value = "";
      assert.ok(message, Definer.input_err3);

      const mb_image_url = verifiedMemberData?.mb_image
        ? verifiedMemberData?.mb_image
        : "/auth/default_user.svg";
      socket.emit("createMsg", {
        msg: message,
        mb_id: verifiedMemberData?.mb_id,
        mb_nick: verifiedMemberData?.mb_nick,
        mb_image: mb_image_url,
      });
      setMessage("");
      // Clean input
      // Send msg
    } catch (err: any) {
      console.log("onClickHandler, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div>
      <Dropdown
        trigger={["click"]}
        className="account_dropdown"
        placement="bottomRight"
        overlayClassName="chatting_root"
        dropdownRender={() => (
          <Stack className="chat_frame">
            <Box className="chat_top">
              <div>Live chat</div>
              <RippleBadge
                style={{
                  margin: "-15px 0 0 20px",
                }}
                badgeContent={onlineUsers}
              />
            </Box>
            <Box className="chat_content">
              <Stack className="chat_main">
                <Box
                  flexDirection={"row"}
                  style={{ display: "flex" }}
                  sx={{ m: "10px 0px" }}
                >
                  <div className="msg_left">Here you can do live chat</div>
                </Box>
                {messagesList}
                {/* boshqa */}
              </Stack>
            </Box>
            <Box className="chat_bott">
              <input
                ref={textInput}
                type="text"
                name="message"
                className="msg_input"
                placeholder="Send message"
                onChange={getInputMessageHandler}
                onKeyDown={getKeyHandler}
              />
              <button className="send_msg_btn" onClick={onClickHandler}>
                {/*checke*/}
                <Send style={{ color: "red" }} />
              </button>
            </Box>
          </Stack>
        )}
      >
        <ChatIcon fontSize="large" className="chat_icon" />
      </Dropdown>
    </div>
  );
}
