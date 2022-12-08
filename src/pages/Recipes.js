import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Container } from "@mui/system";
import { useRef } from "react";
import RecipeCategories from "../components/RecipeCategories";
import { deleteRecipe, fetchRecipes } from "../store/reducers/entities/recipes";
import { MoreVertOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (e, value) => {
    setTab(value);
  };

  const addRecipeCategory = () => {
    console.log("Adding category...");
  };

  const handleAddRecipe = () => {
    navigate("/recipes/new");
  };

  const handles = [handleAddRecipe, addRecipeCategory];
  const handleNew = () => {
    handles[tab]();
  };

  return (
    <Box>
      <Container>
        <Container maxWidth="md">
          <Grid container justifyContent={"space-between"} alignItems="center">
            <Grid item>
              <Typography variant="h4">Recipes</Typography>
            </Grid>
            <Grid item>
              <RecipeTabs tab={tab} onTabChange={handleTabChange} />
            </Grid>
            <Grid item>
              <Button onClick={handleNew}>Add New</Button>
            </Grid>
          </Grid>
        </Container>

        <TabContext value={tab.toString()}>
          <TabPanel value={"0"}>
            <RecipesList />
          </TabPanel>
          <TabPanel value={"1"}>
            <RecipeCategories />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default memo(Recipes);

const RecipeTabs = memo(({ tab, onTabChange }) => {
  return (
    <Tabs value={tab} onChange={onTabChange}>
      <Tab disableRipple sx={{ textTransform: "none" }} label="Recipes" />
      <Tab disableRipple sx={{ textTransform: "none" }} label="Categories" />
    </Tabs>
  );
});

const RecipesList = memo(() => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.entities.recipes);

  const handleDelete = (item) => {
    dispatch(deleteRecipe(item._id));
  };

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchRecipes());
      apiCalled.current = true;
    }
  }, []);

  return (
    <Box>
      <Container maxWidth="md">
        <List>
          {recipes.data.items.map((r) => (
            <Paper key={r._id} sx={{ padding: "0.5em 0", marginBottom: "1em" }}>
              <RecipeListItem
                title={r.name}
                imageUrl={r?.image?.url || "none"}
                prepTime={r.prepTime}
                cookingTime={r.cookingTime}
                recipeYield={r.yield}
                difficulty="Easy"
                onDelete={() => handleDelete(r)}
                onUpdate={() => console.log(r)}
              />
            </Paper>
          ))}
        </List>
      </Container>
    </Box>
  );
});

const RecipeListItem = ({
  title,
  imageUrl,
  rating,
  prepTime,
  cookingTime,
  recipeYield,
  difficulty,
  onUpdate,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.target);
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleChoseMenu = (item) => {
    if (item.onClick) item.onClick();
    handleCloseMenu();
  };

  const menuItems = [
    { label: "Update", onClick: onUpdate },
    { label: "Delete", onClick: onDelete },
  ];

  return (
    <ListItem sx={{ position: "relative" }}>
      <Grid container spacing={2}>
        <Grid item>
          <CardMedia
            sx={(theme) => ({
              height: "10em",
              width: "15em",
              backgroundColor: theme.palette.common.light,
              borderRadius: 1,
            })}
            image={imageUrl || "none"}
          />
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" fontWeight={"bold"}>
                {title}
              </Typography>
            </Grid>
            <Grid item>{rating}</Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="body2">Prep Time: {prepTime}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Cooking Time: {cookingTime}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body2">Yield: {recipeYield}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Difficulty: {difficulty}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Menu open={open} anchorEl={anchorEl} onClose={handleCloseMenu}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index.toString()}
            onClick={() => handleChoseMenu(item)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
      <ListItemSecondaryAction
        sx={{ position: "absolute", top: "1.2em", right: 0 }}
      >
        <IconButton onClick={handleOpenMenu}>
          <MoreVertOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
