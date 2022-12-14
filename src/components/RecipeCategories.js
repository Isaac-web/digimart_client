import React, { memo, useEffect, useRef } from "react";
import { Box, Grid, List, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
} from "../store/reducers/entities/recipeCategories";
import AppListItem from "./AppListItem";
import AppCircurlarProgress from "./AppProgress";

const RecipeCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.entities.recipeCategories);

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchCategories());
      apiCalled.current = true;
    }
  }, []);

  const handleSecondaryAction = (c) => {
    dispatch(deleteCategory(c));
  };

  if (!categories.data?.items?.length)
    return (
      <Grid container justifyContent={"center"} alignItems="center">
        <Grid item>
          <Typography align="center" variant="h6">
            No Recipe Categories
          </Typography>
          <Typography align="center" variant="subtitle2">
            Click the 'Add New' button to add
          </Typography>
        </Grid>
      </Grid>
    );

  if (categories.loading)
    return (
      <Grid container justifyContent={"center"} alignItems="center">
        <Grid item>
          <AppCircurlarProgress size={"0.8em"} />
        </Grid>
      </Grid>
    );
  return (
    <Box>
      <Container maxWidth="md">
        <List>
          {categories.data.items.map((c, index) => (
            <Paper key={index.toString()} sx={{ marginBottom: "0.8em" }}>
              <AppListItem
                title={c.name}
                subtitle="subtitle"
                secondaryButtonShown
                avatarShown
                onSecondaryAction={() => handleSecondaryAction(c)}
              />
            </Paper>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default memo(RecipeCategories);
