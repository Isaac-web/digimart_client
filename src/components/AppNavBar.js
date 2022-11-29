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
  Popover,
  Popper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Logout, Menu, Notifications, Settings } from "@mui/icons-material";

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
        <ProfilePopper
          open={open}
          anchorEl={anchorEl}
          id={popperId}
          onClose={() => setOpen(false)}
        />
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, marginBottom: 2 }} />
    </div>
  );
};

export default AppNavBar;

const ProfilePopper = ({ open, anchorEl, id, onClose }) => {
  const dispatch = useDispatch();
  const token = storage.getItem("token");
  const user = token && jwtDecode(token);

  const handleLogout = () => {
    dispatch(logout(() => (window.location = "/login")));
  };

  if (!user) return null;

  return (
    <Popover
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      onClose={onClose}
      id={id}
      anchorEl={anchorEl}
      open={open}
      sx={{
        "& .MuiPopover-paper": {
          width: "18em",
        },
      }}
    >
      <Box
        sx={(theme) => ({
          margin: "1.5em 0.8em",
        })}
      >
        {/* <Paper sx={(theme) => ({ padding: "1em", width: "15em" })}> */}
        <Grid container spacing={2}>
          <Grid
            item
            container
            spacing={2}
            direction="column"
            alignItems="center"
          >
            {/* Avatar */}
            <Grid item>
              <Avatar
                sx={{ width: "60px", height: "60px", borderRadius: "30px" }}
              >
                IT
              </Avatar>
            </Grid>
            {/* Username text */}
            <Grid item container alignItems="center" direction="column">
              <Grid item>
                <Typography align="center" fontWeight="bold" variant="body1">
                  {user.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="center" variant="subtitle2">
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button size="small" variant="outlined" fullWidth>
              View Profile
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{ textAlign: "left" }}
              fullWidth
              size="small"
              variant="text"
              startIcon={<Settings />}
            >
              Settings
            </Button>
          </Grid>

          <Grid item>
            <Button
              size="small"
              startIcon={<Logout sx={{ fontSize: "10px" }} />}
              onClick={handleLogout}
              variant="text"
            >
              Logout
            </Button>
          </Grid>
        </Grid>
        {/* </Paper> */}
      </Box>
    </Popover>
  );
};
