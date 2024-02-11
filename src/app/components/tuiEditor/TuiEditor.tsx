import React from "react";
import { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export const TuiEditor = (props: any) => {
  const editorRef = useRef();
  return (
    <Stack>
      <Stack
        direction={"row"}
        style={{ margin:"10px", justifyContent: "space-evenly" }}
      >
        <Box className="form_row">
          <Typography
            variant="h3"
            style={{  margin: "10px" }}
          >
            Category
          </Typography>
          <FormControl sx={{ width: "300px", background: "#fff" }}>
            <Select
              value={"celebrity"}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <span>Choose category</span>
              </MenuItem>
              <MenuItem value="celebrity">Famause</MenuItem>
              <MenuItem value="evaluation">Evaluation</MenuItem>
              <MenuItem value="story">Story</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            variant="h3"
            style={{  margin: "10px" }}
          >
            Theme
          </Typography>
          <TextField
            id="filled-basic"
            label="Theme"
            // variant="filled"
            style={{ width: "300px",backgroundColor:"#fff" }}
          />
        </Box>
      </Stack>
      {/* @ts-ignore */}
      <Editor
        ref={editorRef}
        placeholder="Type here"
        previewStyle="vertical"
        height="400px"
        initialValue=" "
        initialEditType="WYSIWYG"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px", width: "250px", height: "45px" }}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
