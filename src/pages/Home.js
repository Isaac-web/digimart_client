import React from "react";
import { Box, Typography, Container } from "@mui/material";

import Coupons from "../components/Coupons";
import DashboardSummery from "../components/DashboardSummery";
import Sliders from "../components/Sliders";

const Home = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "1.5em" }}>
        <DashboardSummery />
      </Box>

      <Box sx={{ marginBottom: "1.5em" }}>
        <Sliders />
      </Box>

      <Box sx={{marginBottom: "3em"}}>
        <Coupons />
      </Box>
    </Container>
  );
};

export default Home;
