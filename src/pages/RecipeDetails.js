import React, { useEffect, useRef } from "react";
import {
  Paper,
  Container,
  Typography,
  CardMedia,
  Grid,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AppListItem from "../components/AppListItem";
import { fetchRecipe } from "../store/reducers/details/recipe";
import { useDispatch, useSelector } from "react-redux";
import AppProgress from "../components/AppProgress";
import { Edit } from "@mui/icons-material";

const RecipeDetails = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiCalled = useRef(false);

  const recipe = useSelector((state) => state.details.recipe);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchRecipe(recipeId));
      apiCalled.current = true;
    }
  }, []);

  if (recipe.loading)
    return (
      <Grid container justifyContent={"center"} alignItems="center">
        <Grid item>
          <AppProgress size={"0.8em"} />
        </Grid>
      </Grid>
    );

  return (
    <Container sx={{ paddingBottom: "4em" }}>
      <Paper sx={{ paddingBottom: "2em" }}>
        <CardMedia
          sx={(theme) => ({
            width: "100%",
            height: "25em",
            backgroundColor: theme.palette.common.light,
          })}
          image={recipe.data.recipe?.image?.url || "none"}
        />

        <Container maxWidth="md">
          <Typography variant="h4">{recipe.data?.recipe?.name}</Typography>
          <Box sx={{ padding: "2em 0" }}>
            <Grid container spacing={3}>
              <Grid item>Prep time: {recipe.data?.recipe?.prepTime}mins</Grid>
              <Grid item>
                Cooking time: {recipe.data?.recipe?.prepTime}mins
              </Grid>
              <Grid item>
                Yield:{" "}
                {`${recipe.data?.recipe?.yield.value} ${recipe.data?.recipe?.yield.label}`}
              </Grid>
              <Grid item>Difficulty: {recipe.data.difficulty || "N/A"}</Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={() => navigate(`/recipes/edit/${recipeId}`)}>
                <Edit />
              </IconButton>
            </Grid>
          </Box>

          <Box
            sx={(theme) => ({
              padding: "1.5em",
              backgroundColor: theme.palette.common.light,
              borderRadius: "1em",
            })}
          >
            <Typography>Description</Typography>
          </Box>

          <Box>
            <Typography fontWeight={"bold"} gutterBottom variant="h5">
              Ingredients
            </Typography>
            <List>
              {recipe.data.ingredientList?.map((item) => (
                <AppListItem
                  key={item._id}
                  avatarShown
                  title={item.name}
                  subtitle={`Quantity: ${item.quantity} x ${item.unit}`}
                  avatarUrl={item?.image?.url}
                />
              ))}
            </List>
          </Box>

          <Box>
            <Typography fontWeight={"bold"} gutterBottom variant="h5">
              Procedure
            </Typography>

            <List>
              {recipe.data?.recipe?.procedure?.map((item, index) => (
                <StepListItem
                  key={index.toString()}
                  number={index + 1}
                  title={item.text}
                />
              ))}
            </List>
          </Box>

          <Box sx={{ padding: "2em 0" }}>
            <Typography gutterBottom>
              Switable for: {recipe?.data?.recipe?.suitableFor}
            </Typography>
          </Box>

          <Typography variant="subtitle2">
            Video Url:{" "}
            <a href={`${recipe?.data?.recipe?.video?.url}`} target="_blank">
              {recipe?.data?.recipe?.video?.url}
            </a>
          </Typography>

          <Box sx={{ padding: "5em 0" }}>
            <Typography variant="h5">Estimate Price: N/A</Typography>
          </Box>

          {/* <div>related recipes</div> */}
        </Container>
      </Paper>
    </Container>
  );
};

const StepListItem = ({ title, number }) => {
  return (
    <ListItem sx={{ marginBottom: "1em" }}>
      <ListItemAvatar>
        <Box
          sx={(theme) => ({
            borderRadius: "50%",
            height: "2em",
            width: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.8em",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          })}
        >
          {number}
        </Box>
      </ListItemAvatar>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
};

export default RecipeDetails;
