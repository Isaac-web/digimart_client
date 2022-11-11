import React from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";

const AppCircurlarProgress = ({ subtitle, title = "Loading", ...rest }) => {
  return (
    <Container>
      <Grid
        alignItems="center"
        container
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ padding: 3 }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography
                align="center"
                variant="h6"
                sx={{ fontWeight: "500" }}
              >
                {title}
              </Typography>
            </Grid>

            <Grid item>
              <Typography align="center" variant="subtitle2" sx={{}}>
                {subtitle}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppCircurlarProgress;
