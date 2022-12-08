import React, { useState } from "react";
import {
  AppBar,
  Container,
  Grid,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSelectField from "../components/form/FormSelectField";
import SubmitButton from "../components/form/FormSubmitButton";
import SearchField from "../components/SearchField";
import { Box } from "@mui/system";
import AppListItem from "../components/AppListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  searchProducts,
} from "../store/reducers/entities/products";

const data = {
  name: "",
  categoryId: "",
  description: "",
  ingredients: "",
  yield: "",
  prepTime: "",
  cookingTime: "",
  cookingMethod: "",
  suitableFor: "",
  procedure: "",
  videoUrl: "",
  imageUrl: "",
};
const EditRecipe = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md">
      <Box>
        <Paper sx={{ padding: "2em" }}>
          <Typography variant="h5" gutterBottom>
            New Recipe
          </Typography>
          <Box>
            <IngredientList />
            {/* <Form initialValues={data} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <FormTextField autoFocus name={"name"} label="Name Of Recipe" />
                <FormTextField name={"categoryId"} label="Recipe Category" />
                <FormTextField
                  xs={12}
                  multiline
                  rows={4}
                  name={"description"}
                  label="Description"
                />
                <FormTextField name={"ingredients"} label="Ingredients" />
                <FormTextField name={"yield"} label="Yield" />
                <FormTextField name={"prepTime"} label="Prep Time" />
                <FormTextField name={"cookingTime"} label="Cooking Time" />
                <FormTextField
                  xs={12}
                  name={"suitableFor"}
                  label="Suitable For"
                />
              </Grid>
              <Grid
                container
                sx={{ padding: "1em 0" }}
                justifyContent="flex-end"
              >
                <SubmitButton>Submit</SubmitButton>
              </Grid>
            </Form> */}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

const IngredientList = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.entities.products);
  const handleChange = (value, key) => {
    setSearchValue(value);
    if (searchValue && key === "Enter") dispatch(searchProducts(value));
  };

  return (
    <Box>
      <Box>
        <Box>
          <Box sx={{ position: "relative" }}>
            <SearchField
              onClear={() => dispatch(clearSearch())}
              loading={products.searching}
              onChange={handleChange}
            />
            {Boolean(products.searchResults.length) && (
              <Paper
                elevation={5}
                sx={{
                  position: "absolute",
                  top: "3em",
                  width: "100%",
                  zIndex: "10",
                }}
              >
                <List>
                  {products.searchResults?.map((p) => (
                    <AppListItem key={p._id} avatarShown title={p.name} />
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
      <List>
        <AppListItem
          avatarShown
          title="Baking Flour"
          subtitle="2 Cups"
          secondaryButtonShown
        />
      </List>
    </Box>
  );
};

export default EditRecipe;
