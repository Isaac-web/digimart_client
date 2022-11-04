import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  IconButton,
  InputBase,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Add, Delete, ModeEdit, MoreVert, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const Categories = () => {
  const { matchesMD } = useContext(AppContext);

  const items = [
    { id: "1", name: "Category 1", numberOfProducts: "13" },
    { id: "2", name: "Category 2", numberOfProducts: "24" },
    { id: "3", name: "Category 3", numberOfProducts: "55" },
    { id: "4", name: "Category 4", numberOfProducts: "4" },
  ];
  return (
    <Container>
      <Paper sx={{ width: "100%" }}>
        <Container maxWidth="md" sx={{ padding: 5 }}>
          <Box>
            <Typography variant="h4">Categories</Typography>
            <Typography variant="subtitle2" gutterBottom>
              There are currently {items.length} categories in the database
            </Typography>
          </Box>

          <Box>
            <Grid container>
              <Grid item xs={12} md={10} sx={{ marginBottom: 2 }}>
                <InputBase
                  fullWidth
                  placeholder="Search Categories"
                  startAdornment={
                    <Search sx={{ marginRight: 2, marginLeft: 1 }} />
                  }
                  sx={(theme) => ({
                    padding: 0.8,
                    backgroundColor: theme.palette.common.light,
                    borderRadius: 2,
                  })}
                />
              </Grid>
              <Grid item xs={12} md={2} sx={{ paddingLeft: matchesMD ? 0 : 1 }}>
                <Button
                  component={Link}
                  fullWidth
                  startIcon={<Add />}
                  size={"large"}
                  to="/categories/new"
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <List>
              {items.map((item) => (
                <CategoryItem
                  key={item.id}
                  title={item.name}
                  subtitle={item.numberOfProducts}
                />
              ))}
            </List>
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

const CategoryItem = ({ onSelect, subtitle, title }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [open, setOpen] = useState(false);

  const menuItems = [
    { id: "1", title: "Edit", Icon: <ModeEdit /> },
    { id: "2", title: "Delete", Icon: <Delete /> },
  ];

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target);
    setOpen(true);
    anchorElement(null);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <ListItem
      component={Paper}
      sx={(theme) => ({
        marginBottom: 2,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          cursor: "pointer",
        },
      })}
    >
      <ListItemAvatar>
        <CardMedia
          sx={(theme) => ({
            height: 60,
            backgroundColor: theme.palette.common.light,
            borderRadius: 2,
            marginRight: 2,
            width: 60,
          })}
        />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={<Typography variant="subtitle2">{subtitle}</Typography>}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
        <Menu
          aria-label="Options"
          anchorEl={anchorElement}
          open={open}
          onClose={handleCloseMenu}
        >
          {menuItems.map((m) => (
            <MenuItem key={m.id}>
              <ListItemIcon>{m.Icon}</ListItemIcon>
              <ListItemText>{m.title}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Categories;
