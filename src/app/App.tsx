import React from 'react';
import '../css/App.css';
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h1"} gutterBottom>
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>
        <RippleBadge  badgeContent={4} style={{width: "120px"}}>
          <Button color="secondary" variant="contained">
            Contained
          </Button>
        </RippleBadge>
      </Stack>
    </Container>
  );
}

export default App;
