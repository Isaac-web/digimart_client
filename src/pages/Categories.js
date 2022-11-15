import React, { useContext, useEffect, useState } from "react";
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
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Add, Delete, ModeEdit, MoreVert } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppContext } from "../context/AppContext";
import AppProgress from "../components/AppProgress";

import {
  fetchCategories,
  deleteCategory,
} from "../store/reducers/entities/categories";
import SearchField from "../components/SearchField";
import Empty from "../Empty";

const Categories = () => {
  const { matchesMD } = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories, loading } = useSelector(
    (state) => state.entities.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleDelete = (category) => {
    dispatch(deleteCategory(category._id));
  };

  const handleUpdate = (category) => {
    navigate(`/categories/update/${category._id}`);
  };

  if (loading)
    return <AppProgress subtitle="Please wait while we load categories." />;


  return ( categories.length ?
<Container maxWidth="md">
  <Box>
    <Typography variant="h4">Categories</Typography>
    <Typography variant="subtitle2" gutterBottom>
      There are currently {categories.length} categories in the database
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
      {categories.map((item) => (
        <CategoryItem
          key={item._id}
          title={item.name}
          subtitle={item.numberOfProducts}
          onDelete={() => handleDelete(item)}
          onUpdate={() => handleUpdate(item)}
        />
      ))}
    </List>
  </Box>
</Container> :  
<Container>
    <Empty CustomComponent={<NoCategoryComponent />} />
</Container>
  );
};

const CategoryItem = ({ onDelete, onUpdate, subtitle, title }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [open, setOpen] = useState(false);

  const menuItems = [
    { id: "1", title: "Edit", Icon: <ModeEdit /> },
    { id: "2", title: "Delete", Icon: <Delete /> },
  ];

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target);
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleMenuSelect = (menu) => {
    switch (menu.id) {
      case "1":
        if (onUpdate) onUpdate();
        break;
      case "2":
        if (onDelete) onDelete();
        break;
      default:
        break;
    }

    handleCloseMenu();
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
            src="none"
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
              <MenuItem key={m.id} onClick={() => handleMenuSelect(m)}>
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

const NoCategoryComponent = () => {
  return (
    <Box sx={{ padding: "3em" }}>
      <Grid
        container
        direction="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid item>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            No category Yet
          </Typography>
        </Grid>
        <Grid item>
          <Typography>No category has been added yet</Typography>
        </Grid>
        <Grid item>
          <Button component={Link} to="/categories/new" variant="text">
            Click here to add one
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Categories;
