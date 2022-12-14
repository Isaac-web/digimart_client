import React, { memo, useEffect, useRef, useState } from "react";
import {
  ButtonBase,
  Container,
  Divider,
  Grid,
  List,
  Paper,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import AppListItem from "../components/AppListItem";
import AppImagePicker from "../components/AppImagePicker";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSelectField from "../components/form/FormSelectField";
import SubmitButton from "../components/form/FormSubmitButton";
import SearchField from "../components/SearchField";
import ProgressDialog from "../components/ProgressDialog";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  searchProducts,
} from "../store/reducers/entities/products";
import { fetchCategories } from "../store/reducers/entities/recipeCategories";
import { addRecipe } from "../store/reducers/entities/recipes";
import { uploadFile } from "../utils/uploader";
import { useNavigate } from "react-router-dom";
import FormRecipeSteps from "../components/form/FormRecipeSteps";

const data = {
  name: "",
  categoryId: "",
  description: "",
  yield: "",
  prepTime: 0,
  cookingTime: 0,
  cookingMethod: "",
  suitableFor: "",
  procedure: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Recipe name"),
  categoryId: Yup.string().required().label("Category"),
  description: Yup.string().required().label("Description"),
  yield: Yup.number("Yield must be an integer")
    .required("Yield is a required field")
    .min(0),
  prepTime: Yup.number().required().min(0),
  cookingTime: Yup.number().required().min(1).label("Cooking Time"),
  cookingMethod: Yup.string().required().label("Cooking method"),
  suitableFor: Yup.string().required(),
  procedure: Yup.array().min(1).required().label("Procedure"),
});

const EditRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  const categories = useSelector((state) => state.entities.recipeCategories);

  const handleUploadProgress = (loaded, total) => {
    setProgress(Math.floor(loaded / total) * 100);
  };

  const handleSubmit = async (data) => {
    if (image) {
      setProgress(0);
      setOpen(true);
      const { uploaded, url, public_id } = await uploadFile(
        image,
        "recipe_images",
        handleUploadProgress
      );
      if (uploaded) {
        data.imageUrl = url;
        data.imagePublicId = public_id;
      }
    }

    data.ingredients = [{ product: "637a0e9fae4b464ec9896bb9" }];

    dispatch(addRecipe(data));
  };

  const handleChangeImage = (file) => {
    if (file) setImage(file);
  };

  const handleUploadDone = () => {
    navigate("/recipes");
  };

  const handleCloseImageUploadDialog = () => {
    setOpen(false);
  };

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      dispatch(fetchCategories());
      apiCalled.current = true;
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ paddingBottom: "3em" }}>
        <Paper sx={{ padding: "2em" }}>
          <Typography variant="h5" gutterBottom fontWeight={"bold"}>
            New Recipe
          </Typography>
          <Box>
            <Form
              initialValues={data}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sx={{ paddingBottom: "1em" }}
                >
                  <Divider>Basic Info</Divider>
                </Grid>

                <FormTextField autoFocus name={"name"} label="Name Of Recipe" />
                <FormSelectField
                  name="categoryId"
                  inputLabel="Recipe Category"
                  items={categories.data.items}
                  menuItemLabelAttribute={"name"}
                  menuItemValueAttribute={"_id"}
                />
                <FormTextField
                  xs={12}
                  multiline
                  rows={4}
                  name={"description"}
                  label="Description"
                />
                <FormTextField name={"cookingMethod"} label="Cooking Method" />
                <FormTextField name={"yield"} label="Yield" />
                <FormTextField
                  name={"prepTime"}
                  label="Prep Time"
                  type="number"
                />
                <FormTextField
                  name={"cookingTime"}
                  label="Cooking Time"
                  type="number"
                />
                <FormTextField
                  xs={12}
                  name={"suitableFor"}
                  label="Suitable For"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ paddingBottom: "2em", marginTop: "5em" }}
              >
                <Divider>Recipe Image</Divider>
              </Grid>
              <Grid item>
                <AppImagePicker
                  label={"Recipe Image"}
                  onChange={handleChangeImage}
                />
                <ProgressDialog
                  open={open}
                  loaded={progress}
                  onDone={handleUploadDone}
                  onClose={handleCloseImageUploadDialog}
                  done={progress === 100}
                />
              </Grid>

              <Grid item xs={12} sx={{ paddingBottom: "1em", marginTop: "5em" }}>
                <Divider>Procedure</Divider>
              </Grid>
              <Grid item container direction="column" sx={{ padding: "2em 0",  }}>
                <FormRecipeSteps name="procedure" />
              </Grid>

              <Grid
                container
                sx={{ padding: "1em 0" }}
                justifyContent="flex-end"
              >
                <SubmitButton>Submit</SubmitButton>
              </Grid>
            </Form>
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

  const ingredients = [];
  const handleSelectItem = (item) => {
    ingredients.push(item);
    console.log(ingredients);
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
                  {products.searchResults?.map((p) => {
                    return (
                      <ButtonBase
                        disableRipple
                        key={p._id}
                        onClick={() => handleSelectItem(p)}
                        sx={(theme) => ({
                          width: "100%",
                          "&:hover": {
                            backgroundColor: theme.palette.common.light,
                          },
                        })}
                      >
                        <AppListItem
                          avatarUrl={p.image.url}
                          avatarShown
                          title={p.name}
                        />
                      </ButtonBase>
                    );
                  })}
                </List>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>

      {console.log(ingredients)}
    </Box>
  );
};

export default memo(EditRecipe);
