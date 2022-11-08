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
import SearchField from "../components/SearchField";

const Categories = () => {
  const { matchesMD } = useContext(AppContext);

  const items = [
    { id: "1", name: "Category 1", numberOfProducts: "13" },
    { id: "2", name: "Category 2", numberOfProducts: "24" },
    { id: "3", name: "Category 3", numberOfProducts: "55" },
    { id: "4", name: "Category 4", numberOfProducts: "4" },
  ];
  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h4">Categories</Typography>
        <Typography variant="subtitle2" gutterBottom>
          There are currently {items.length} categories in the database
        </Typography>
      </Box>

      <Box>
        <Grid container>
          <Grid item xs={12} md={10} sx={{ marginBottom: 2 }}>
            <SearchField placeholder="Search categories..." />
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
    <Paper
      sx={(theme) => ({
        cursor: "pointer",
        marginBottom: "10px",
        borderRadius: theme.rounded.small,
      })}
      variant="outlined"
    >
      <ListItem>
        <ListItemAvatar>
          <CardMedia
            sx={(theme) => ({
              height: "3em",
              backgroundColor: theme.palette.common.extraLight,
              borderRadius: 2,
              marginRight: 2,
              width: "3em",
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
    </Paper>
  );
};

export default Categories;
