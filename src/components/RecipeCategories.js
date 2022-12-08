import React, { memo, useEffect, useRef } from "react";
import { Box, List, Paper } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/reducers/entities/recipeCategories";
import AppListItem from "./AppListItem";

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
    console.log(c);
  };

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
