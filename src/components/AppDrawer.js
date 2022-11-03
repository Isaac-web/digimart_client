import React from "react";
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

const AppDrawer = () => {
  const location = useLocation();

  const items = [
    { id: "1", title: "Home", link: "/home" },
    { id: "2", title: "Orders", link: "/orders" },
    { id: "3", title: "Products", link: "/products" },
    { id: "4", title: "Categoreis", link: "/categories" },
  ];

  return (
    <div>
      <Drawer
        anchor="left"
        open={true}
        PaperProps={{
          style: { width: 240, padding: "0 10px" },
        }}
        variant="persistent"
      >
        <DrawerHeader>
          <Box
            sx={{ alignItems: "center", display: "flex", flexDirection: "row" }}
          >
            <Box sx={{ marginRight: 1 }}>
              <CardMedia
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  height: 50,
                  width: 50,
                }}
                image={"../assets/digimart_logo.png"}
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
          {items.map((item) => (
            <DrawerListItem
              active={location.pathname.startsWith(item.link)}
              key={item.link}
              link={item.link}
              title={item.title}
            />
          ))}
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
                ? theme.palette.common.white
                : theme.palette.primary.main,
              backgroundColor: active ? theme.palette.primary.main : "none",
            },
            borderRadius: 2,
            color: active
              ? theme.palette.common.white
              : theme.palette.primary.main,
            backgroundColor: active ? theme.palette.primary.main : "white",
            height: 45,
            marginBottom: "5px",
          })}
        >
          {Icon && <ListItemIcon>{Icon}</ListItemIcon>}
          <ListItemText>
            <Typography variant="subtitle1">{title}</Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default AppDrawer;
