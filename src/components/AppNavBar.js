import React, { useContext, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Logout, Menu, Notifications } from "@mui/icons-material";

import { AppContext } from "../context/AppContext";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/auth/auth";
import useAuth from "../customHooks/useAuth";
import jwtDecode from "jwt-decode";
import storage from "../utils/storage";

const AppNavBar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { setDrawerOpen, drawerMargin } = useContext(AppContext);
  const popperId = open ? "profile-popper-id" : undefined;
  const isLoggedIn = useAuth();

  const togglePopper = ({ target }) => {
    if (open) {
      setOpen(false);
      setAnchorEl(target);
    } else {
      setAnchorEl(target);
      setOpen(true);
    }
  };

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
          <Grid container justifyContent={"space-between"}>
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

            {isLoggedIn && (
              <Grid item>
                <Grid alignItems="center" container sx={{ height: "100%" }}>
                  <Grid item>
                    <Notifications />
                  </Grid>
                  <Grid sx={{ padding: "0 1em" }}>
                    <Divider orientation="vertical" />
                  </Grid>
                  <Grid item>
                    <Avatar onClick={togglePopper} />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
        <ProfilePopper open={open} anchorEl={anchorEl} id={popperId} />
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, marginBottom: 2 }} />
    </div>
  );
};

export default AppNavBar;

const ProfilePopper = ({ open, anchorEl, id }) => {
  const dispatch = useDispatch();
  const token = storage.getItem("token");
  const user = token && jwtDecode(token);
  

  const handleLogout = () => {
    dispatch(logout(() => (window.location = "/login")));
  };

  if(!user) return null;

  return (
    <Popper id={id} anchorEl={anchorEl} open={open}>
      <Box
        sx={(theme) => ({
          margin: "1.5em 0.8em",
        })}
      >
        <Paper sx={(theme) => ({ padding: "1em", width: "15em" })}>
          <Grid container spacing={2}>
            <Grid item container spacing={2}>
              <Grid item>
                <ListItem>
                  <ListItemAvatar>
                  <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={
                      <Typography variant="subtitle2">
                        {user?.designtionId}
                      </Typography>
                    }
                  />
                </ListItem>
              </Grid>
            </Grid>

            <Grid item>
              <Button size="small" endIcon={<Logout />} onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Popper>
  );
};
