import React, { useContext } from "react";
import {
  Box,
  CardMedia,
  Drawer,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import drawerData from "../data/drawer";
import logo from "../assets/logo.png";
import useUser from "../customHooks/useUser";

const AppDrawer = () => {
  const location = useLocation();
  const user = useUser();

  const categories = [];
  for (let item in drawerData) {
    categories.push(item);
  }

  const { drawerOpen, setDrawerOpen, matchesMD } = useContext(AppContext);

  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        PaperProps={{
          style: { width: 230, padding: "0 20px", boxSizing: "border-box" },
        }}
        variant={matchesMD ? "temporary" : "persistent"}
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerHeader>
          <Box
            sx={{ alignItems: "center", display: "flex", flexDirection: "row" }}
          >
            <Box sx={{ marginRight: 0 }}>
              <CardMedia
                sx={{
                  borderRadius: "10px",
                  height: "3.3em",
                  width: "4.0em",
                  backgroundSize: "contain",
                }}
                image={logo}
              />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={"bold"}>
                Digimart
              </Typography>
            </Box>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {categories.map((c, index) => {
            //The conditional rendering below renders based on three conditions;
            //1. If the user is a system user
            //2. if the category has an auth property which should be an array
            //3. if the desination of the user is found in the auth property of
            //   the category(c)
            if (
              user &&
              user?.userType !== "system" &&
              drawerData[c]?.auth &&
              drawerData[c]?.auth?.indexOf(user.designation) === -1
            )
              return null;

            return (
              <Box key={c}>
                {index !== 0 && <Divider sx={{ margin: "1em 0" }} />}
                {drawerData[c].entities.map((item) => (
                  <DrawerListItem
                    Icon={item.Icon}
                    active={location.pathname.startsWith(item.link)}
                    key={item.link}
                    link={item.link}
                    title={item.title}
                  />
                ))}
              </Box>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

const DrawerHeader = ({ children }) => {
  return (
    <Box
      sx={{
        padding: 1,
      }}
    >
      {children}
    </Box>
  );
};

const DrawerListItem = ({ title, Icon, link, active = false }) => {
  const theme = useTheme();

  return (
    <ListItem disablePadding>
      <Link style={{ textDecoration: "none", width: "100%" }} to={link}>
        <ListItemButton
          sx={() => ({
            "&:hover": {
              color: active
                ? theme.palette.primary.main
                : theme.palette.primary.main,
              backgroundColor: active
                ? theme.palette.common.extraLight
                : "none",
            },
            borderRadius: 2,
            color: active
              ? theme.palette.primary.main
              : theme.palette.common.medium,
            backgroundColor: active ? theme.palette.common.extraLight : "white",
            height: 40,
            marginBottom: 1,
          })}
        >
          {Icon && (
            <ListItemIcon
              style={{
                color: active
                  ? theme.palette.primary.main
                  : theme.palette.common.medium,
                marginRight: "-1em",
              }}
            >
              {Icon}
            </ListItemIcon>
          )}
          <ListItemText>
            <Typography variant="subtitle2">{title}</Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default AppDrawer;
