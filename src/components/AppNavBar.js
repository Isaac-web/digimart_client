import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

import { AppContext } from "../context/AppContext";

const AppNavBar = () => {
  const theme = useTheme();
  const { drawerOpen, setDrawerOpen, drawerMargin } = useContext(AppContext);

  return (
    <div>
      <AppBar
        sx={{
          backgroundColor: theme.palette.common.white,
          paddingLeft: `${drawerMargin}px`,
          transition: theme.transitions.create(["padding"]),
          boxShadow: `0 0 1px ${theme.palette.common.medium}`,
        }}
      >
        <Toolbar sx={{ color: theme.palette.primary.main }}>
          <Grid container>
            <Grid item>
              <IconButton
                style={{ color: theme.palette.primary.main }}
                onClick={() =>
                  setDrawerOpen((prev) => (prev === true ? false : true))
                }
              >
                <Menu />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, marginBottom: 2 }} />
    </div>
  );
};

export default AppNavBar;
