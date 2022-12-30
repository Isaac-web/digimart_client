import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";

import { dashboardData } from "../data/dashboard";
import DashboardSummeryTile from "../components/DashboardSummeryTile";
import Coupons from "../components/Coupons";

const Home = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <Box sx={{ marginBottom: "1.5em" }}>
        <Grid container spacing={3}>
          {dashboardData.map((item, index) => (
            <DashboardSummeryTile
              key={index.toString()}
              title={item.title}
              subtitle={item.subtitle}
              xData={item.xData}
              Icon={item.Icon}
              iconColor={item.iconColor}
              iconBackgroundColor={item.iconBackgroundColor}
            />
          ))}
        </Grid>
      </Box>

      <Box>
        <Coupons />
      </Box>
    </Container>
  );
};

export default Home;
