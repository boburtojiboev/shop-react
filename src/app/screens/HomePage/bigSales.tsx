import React from "react";
import { Favorite, Visibility } from "@mui/icons-material";
import { CardOverflow, IconButton } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { AspectRatio, Link } from "@mui/joy";
import ListAltIcon from "@mui/icons-material/ListAlt";

export function BigSales() {
  return (
    <div className="big_sale_frame">
      <Container sx={{ pt: "30px", mb: "0px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Big sale</Box>
          <Box className="category_title_box">
            <Box className="more_than">
              <ListAltIcon style={{ height: "40px" }} />
              more than
            </Box>
          </Box>
          <Stack
            sx={{ mt: "30px", mb: "50px", gap: "40px" }}
            justifyContent={"space-between"}
            flexDirection={"row"}
            className="big_sale_stack"
          >
            <CssVarsProvider>
              <Card
                className="img_carts"
                variant="outlined"
                sx={{ minHeight: 320, minWidth: 280 }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"/shops/sneakers.jpg"} alt="" />
                  </AspectRatio>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 5,
                      left: "0rem",
                      transform: "translateY(50%)",
                      color: "#ffffff",
                      backgroundColor: "red",
                      borderRadius: "0",
                    }}
                  >
                    -100%
                  </Box>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      top: 45,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <LocalMallIcon style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography
                  level="h3"
                  sx={{ fontSize: "md", lineHeight: "10px", mt: "1" }}
                >
                  ProductName
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<AttachMoneyIcon />}
                    textColor="neutral.700"
                  >
                    Price
                  </Link>
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<ColorLensIcon />}
                    textColor="neutral.700"
                  >
                    color
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 0.8,
                    borderTop: ".4px solid",
                    // bgcolor: "Background.level1",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100 <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>500</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>

              <Card
                className="img_carts"
                variant="outlined"
                sx={{ minHeight: 320, minWidth: 280 }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"/shops/sneakers.jpg"} alt="" />
                  </AspectRatio>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 5,
                      left: "0rem",
                      transform: "translateY(50%)",
                      color: "#ffffff",
                      backgroundColor: "red",
                      borderRadius: "0",
                    }}
                  >
                    -100%
                  </Box>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      top: 45,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <LocalMallIcon style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography
                  level="h3"
                  sx={{ fontSize: "md", lineHeight: "10px", mt: "1" }}
                >
                  ProductName
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<AttachMoneyIcon />}
                    textColor="neutral.700"
                  >
                    Price
                  </Link>
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<ColorLensIcon />}
                    textColor="neutral.700"
                  >
                    color
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 0.8,
                    borderTop: ".4px solid",
                    // bgcolor: "Background.level1",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100 <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>500</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>

              <Card
                className="img_carts"
                variant="outlined"
                sx={{ minHeight: 320, minWidth: 280 }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"/shops/sneakers.jpg"} alt="" />
                  </AspectRatio>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 5,
                      left: "0rem",
                      transform: "translateY(50%)",
                      color: "#ffffff",
                      backgroundColor: "red",
                      borderRadius: "0",
                    }}
                  >
                    -100%
                  </Box>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      top: 45,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <LocalMallIcon style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography
                  level="h3"
                  sx={{ fontSize: "md", lineHeight: "10px", mt: "1" }}
                >
                  ProductName
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<AttachMoneyIcon />}
                    textColor="neutral.700"
                  >
                    Price
                  </Link>
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<ColorLensIcon />}
                    textColor="neutral.700"
                  >
                    color
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 0.8,
                    borderTop: ".4px solid",
                    // bgcolor: "Background.level1",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100 <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>500</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>

              <Card
                className="img_carts"
                variant="outlined"
                sx={{ minHeight: 320, minWidth: 280 }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img src={"/shops/sneakers.jpg"} alt="" />
                  </AspectRatio>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 5,
                      left: "0rem",
                      transform: "translateY(50%)",
                      color: "#ffffff",
                      backgroundColor: "red",
                      borderRadius: "0",
                    }}
                  >
                    -100%
                  </Box>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <Favorite style={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    aria-label="Like minimal phtography"
                    size="md"
                    variant="solid"
                    color="neutral"
                    className="like_hover"
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      top: 45,
                      borderRadius: "50%",
                      right: "1rem",
                      transform: "translateY(50%)",
                      color: "rgba(0,0,0,.2)",
                    }}
                  >
                    <LocalMallIcon style={{ color: "white" }} />
                  </IconButton>
                </CardOverflow>
                <Typography
                  level="h3"
                  sx={{ fontSize: "md", lineHeight: "10px", mt: "1" }}
                >
                  ProductName
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<AttachMoneyIcon />}
                    textColor="neutral.700"
                  >
                    Price
                  </Link>
                </Typography>
                <Typography level="body-md" sx={{ lineHeight: "10px" }}>
                  <Link
                    href=""
                    startDecorator={<ColorLensIcon />}
                    textColor="neutral.700"
                  >
                    color
                  </Link>
                </Typography>
                <CardOverflow
                  variant="soft"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    py: 0.8,
                    borderTop: ".4px solid",
                    // bgcolor: "Background.level1",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    100 <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                  <Box sx={{ width: 2, bgcolor: "divider" }}></Box>
                  <Typography
                    level="body-sm"
                    sx={{
                      fontSize: "md",
                      color: "neutral.400",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>500</div>
                    <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                  </Typography>
                </CardOverflow>
              </Card>
            </CssVarsProvider>
          </Stack>
          {/* <Stack  width= "100%" flexDirection={"row"} justifyContent={"flex-end"}>
            <button className={"checkbox"}>Check More</button>
          </Stack> */}
        </Stack>
      </Container>
    </div>
  );
}
