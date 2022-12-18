import React, { memo, useEffect, useRef, useState } from "react";
import {
  ButtonBase,
  Container,
  Divider,
  Grid,
  InputAdornment,
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
import { useFormikContext } from "formik";

const data = {
  name: "",
  categoryId: "",
  description: "",
  yieldValue: "",
  yieldLabel: "",
  prepTime: 0,
  cookingTime: 0,
  cookingMethod: "",
  suitableFor: "",
  procedure: [],
  ingredients: [],
  videoUrl: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Recipe name"),
  categoryId: Yup.string().required().label("Category"),
  description: Yup.string().required().label("Description"),
  yieldValue: Yup.number("Yield must be an integer")
    .required("Yield is a required field")
    .min(0),
  yieldLabel: Yup.string().required("Yield is a required field"),
  prepTime: Yup.number().required().min(0),
  cookingTime: Yup.number().required().min(1).label("Cooking Time"),
  cookingMethod: Yup.string().required().label("Cooking method"),
  suitableFor: Yup.string().required(),
  procedure: Yup.array().min(1).required().label("Procedure"),
  ingredients: Yup.array().min(1).required().label("Ingredients"),
  videoUrl: Yup.string().max(1024),
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

      if (!uploaded) return console.log("Something went wrong.");

      if (uploaded) {
        data.imageUrl = url;
        data.imagePublicId = public_id;
      }
    }

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
    <Container maxWidth="lg">
      <Box sx={{ paddingBottom: "3em" }}>
        <Paper sx={{ padding: "2em" }}>
          <Container maxWidth="md">
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
                  <Grid item xs={12} sx={{ paddingBottom: "1em" }}>
                    <Divider>Basic Info</Divider>
                  </Grid>

                  <FormTextField
                    autoFocus
                    name={"name"}
                    label="Name Of Recipe"
                  />
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
                  <FormTextField
                    name={"cookingMethod"}
                    label="Cooking Method"
                  />
                  <FormTextField
                    xs={3}
                    type="number"
                    name={"yieldValue"}
                    label="Yield Value"
                  />
                  <FormTextField
                    xs={3}
                    name={"yieldLabel"}
                    label="Yield Label"
                  />
                  <FormTextField
                    name={"prepTime"}
                    label="Prep Time"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mins</InputAdornment>
                      ),
                    }}
                  />
                  <FormTextField
                    name={"cookingTime"}
                    label="Cooking Time"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mins</InputAdornment>
                      ),
                    }}
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

                <Grid
                  item
                  xs={12}
                  sx={{ paddingBottom: "1em", marginTop: "5em" }}
                >
                  <Divider>Procedure</Divider>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  sx={{ padding: "2em 0" }}
                >
                  <FormRecipeSteps name="procedure" />
                </Grid>

                <Grid item sx={{ marginBottom: "5em" }}>
                  <IngredientList name="ingredients" />
                </Grid>

                <Grid item>
                  <FormTextField name={"videoUrl"} label="Video Url" />
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
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};

const IngredientList = ({ name }) => {
  const [searchValue, setSearchValue] = useState("");
  const [productItems, setProductItems] = useState([]);
  const [formatedProducts, setFormatedProducts] = useState([]);
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();

  const products = useSelector((state) => state.entities.products);

  const handleChange = (value, key) => {
    setSearchValue(value);
    if (searchValue && key === "Enter") dispatch(searchProducts(value));
  };

  const handleSelectItem = (item) => {
    setProductItems([...productItems, item]);
    setFormatedProducts([...formatedProducts, { product: item._id }]);
    setFieldValue(name, [...formatedProducts, { product: item._id }]);
    dispatch(clearSearch());
    setSearchValue("");
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

          <Box>
            {productItems?.length ? (
              <List>
                {productItems.map((item) => (
                  <AppListItem
                    key={item._id}
                    avatarShown
                    avatarUrl={item.image.url}
                    title={item.name}
                  />
                ))}
              </List>
            ) : (
              <Box sx={{ padding: "1em 0" }}>
                <Typography variant="subtitle2" align="center">
                  Please select at least one ingredient
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(EditRecipe);
