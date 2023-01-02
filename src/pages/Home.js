import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";

import { dashboardData } from "../data/dashboard";
import DashboardSummeryTile from "../components/DashboardSummeryTile";
import Coupons from "../components/Coupons";
import DashboardSummery from "../components/DashboardSummery";

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

      <Box>
        <Coupons />
      </Box>
    </Container>
  );
};

export default Home;
