import { Box, Stack } from "@mui/material";
import React, { useRef } from "react";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const TViewer = (props: any) => {
  const editorRef = useRef();
  return (
    <Stack sx={{ background: "#fff", mt: "30px", borderRadius: "10px" }}>
      <Box sx={{ m: "40px" }}>
        <Viewer
          // @ts-ignore
          ref={editorRef}
          initialValue={props.text}
          //   initialValue={props.chosenSingleBoArticle?.art_content}
          height="600px"
        />
      </Box>
    </Stack>
  );
};

export default TViewer;
