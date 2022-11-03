import React from "react";
import { AppBar, Box, Toolbar, useTheme } from "@mui/material";

const AppNavBar = () => {
  const theme = useTheme();

  return (
    <div>
      <AppBar
        sx={{ backgroundColor: theme.palette.common.white, marginLeft: 400 }}
      >
        <Toolbar style={{}}>Hello</Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, marginBottom: 2 }} />
    </div>
  );
};

export default AppNavBar;
