import { Box, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Close, Home } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

export function AllEvents() {
  const history = useHistory();
  return (
    <div className="all_event">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="box_link">
            <Box onClick={() => history.push("/")} className="home_link">
              <Home />
              Home
            </Box>
            <p className="">/</p>
            <Box onClick={() => history.push("/")} className="home_link">
              Events
              <Close className="close" />
            </Box>
          </Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            flexWrap={"wrap"}
            gap={"20px"}
            justifyContent={"space-between"}
            width={"100%"}
            marginBottom={"60px"}
          >
            {Array.from(Array(20).keys()).map((ele, index) => {
              return (
                <Box className="review_box_review" key={`${index}`}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img src="/shops/open.jpeg" className="review_img_review" />
                  </Box>
                  <span className="review_name_review">
                    Nike opening ceremony{" "}
                  </span>
                  <span className="review_prof_rev">
                    <LocationOnIcon
                      style={{
                        marginRight: "10px",
                        paddingTop: "10px",
                        width: "35pxpx",
                        height: "35px",
                      }}
                    />
                    Busan South Korea
                  </span>
                  <Box className="details_box">
                    <p>Details</p>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

