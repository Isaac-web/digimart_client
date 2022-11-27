import React from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";

const DashboarSummeryTile = ({
  title,
  subtitle,
  xData,
  Icon,
  iconColor,
  iconBackgroundColor,
}) => {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Paper
        sx={(theme) => ({
          borderRadius: theme.rounded.small,
        })}
      >
        <Box sx={{ padding: "1.5em" }}>
          <Grid container direction={"column"}>
            <Grid item>
              <Box
                sx={(theme) => ({
                  alignItems: "center",
                  backgroundColor: iconBackgroundColor,
                  borderRadius: theme.rounded.full,
                  display: "flex",
                  iconColor: iconColor || "#000000",
                  justifyContent: "center",
                  height: "3em",
                  marginBottom: "0.5em",
                  width: "3em",
                })}
              >
                {Icon}
              </Box>
            </Grid>
            <Grid item>
              <Typography varaint="body1" fontWeight="bold">
                {title}

                <Typography
                  sx={{
                    display: "inline",
                    fontWeight: "300",
                    marginLeft: "1em",
                  }}
                  variant="inherit"
                >
                  {xData}
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                varaint="subtitle1"
                sx={(theme) => ({ fontSize: "0.8rem" })}
              >
                {subtitle}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default DashboarSummeryTile;
