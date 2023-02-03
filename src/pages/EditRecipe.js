import React, { memo, useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  Paper,
  TextField,
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
import {
  getImagePresignedUrl,
  getVideoPresignedUrl,
  uploadAWSFile,
} from "../utils/uploader";
import { useNavigate, useParams } from "react-router-dom";
import FormRecipeSteps from "../components/form/FormRecipeSteps";
import { useFormikContext } from "formik";
import { fetchRecipe, updateRecipe } from "../store/reducers/details/recipe";
import AppCircurlarProgress from "../components/AppProgress";
import { Delete, Edit, Upload } from "@mui/icons-material";
import VideoPicker from "../components/VideoPicker";

const data = {
  name: "",
  categoryId: "",
  description: "",
  yieldValue: 0,
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
  const { id: recipeId } = useParams();
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoPublicId, setVideoPublicId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [videoPresignedUrlLoading, setVideoPresignedUrlLoading] =
    useState(false);
  const [open, setOpen] = useState(false);

  const categories = useSelector((state) => state.entities.recipeCategories);
  const recipe = useSelector((state) => state.details.recipe);

  const loadRecipeData = async () => {
    dispatch(fetchRecipe(recipeId));
  };

  const handleUploadProgress = (loaded) => {
    setProgress(loaded);
  };

  const handleSubmit = async (data) => {
    if (image) {
      setProgress(0);
      setOpen(true);
      const { signedUrl, publicId, url } = await getImagePresignedUrl({
        path: "recipes/images",
      });

      const { uploaded } = await uploadAWSFile(
        signedUrl,
        image,
        handleUploadProgress
      );

      if (!uploaded) return;

      if (uploaded) {
        data.imageUrl = url;
        data.imagePublicId = publicId;
      }
    }

    if (videoUrl) data.videoUrl = videoUrl;
    if (videoPublicId) data.videoPublicId = videoPublicId;

    if (recipeId && recipe) {
      dispatch(updateRecipe(recipeId, data, () => navigate("/recipes")));
    } else dispatch(addRecipe(data));

    setVideoUrl(null);
    setVideoPublicId(null);
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

  const handleSetVideo = (video) => {
    setVideo(video);
  };

  const trackVideoUploadProgress = (loaded) => {
    setVideoUploadProgress(loaded);
  };

  const handleVideoUpload = async () => {
    if (!video) return;
    setVideoUploadProgress(0);
    setVideoPresignedUrlLoading(true);
    const { url, signedUrl, publicId } = await getVideoPresignedUrl({
      path: "recipes/videos",
    });
    setVideoPresignedUrlLoading(false);

    const res = await uploadAWSFile(signedUrl, video, trackVideoUploadProgress);

    if (res.uploaded) {
      setVideoUrl(url);
      setVideoPublicId(publicId);
    }
  };

  const mapRecipeDataToInputs = (recipe) => {
    if (recipe) {
      data.name = recipe?.data?.recipe?.name;
      data.categoryId = recipe?.data?.recipe?.category;
      data.description = recipe?.data?.recipe?.description;
      data.yieldValue = recipe?.data?.recipe?.yield?.value;
      data.yieldLabel = recipe?.data?.recipe?.yield?.label;
      data.prepTime = recipe?.data?.recipe?.prepTime;
      data.cookingTime = recipe?.data?.recipe?.cookingTime;
      data.cookingMethod = recipe?.data?.recipe?.cookingMethod;
      data.suitableFor = recipe?.data?.recipe?.suitableFor;
      data.ingredients = recipe?.data?.recipe?.ingredients;
      data.procedure = recipe?.data?.recipe?.procedure;
      data.videoUrl = recipe?.data?.recipe?.video?.url;
    }
  };

  const apiCalled = useRef(false);
  useEffect(() => {
    if (!apiCalled.current) {
      if (recipeId) loadRecipeData();

      dispatch(fetchCategories());
      apiCalled.current = true;
    }
  }, []);

  if (categories.loading || recipe?.loading)
    return <AppCircurlarProgress size="1em" />;

  if (recipe) mapRecipeDataToInputs(recipe);

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
                    imageUrl={recipe?.data?.recipe?.image?.url}
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
                  <IngredientList
                    name="ingredients"
                    list={recipe?.data?.ingredientList}
                  />
                </Grid>

                <Grid
                  item
                  container
                  direction="column"
                  spacing={2}
                  sx={{ marginTop: 1 }}
                >
                  <Grid item>
                    <VideoPicker onChange={handleSetVideo} />
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Button
                          onClick={handleVideoUpload}
                          startIcon={<Upload />}
                          disabled={!video || videoUploadProgress > 0}
                        >
                          Upload
                        </Button>
                      </Grid>
                      {videoPresignedUrlLoading && (
                        <Grid item>
                          <CircularProgress size={"1em"} />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {videoUploadProgress ? (
                    <Grid item xs={12}>
                      <LinearProgress
                        variant="determinate"
                        value={videoUploadProgress}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "0.9em" }}
                      >
                        Uploading Video: {videoUploadProgress.toFixed(1)}%
                      </Typography>
                    </Grid>
                  ) : null}

                  {videoUploadProgress === 100 && (
                    <Typography
                      variant="subtitle2"
                      sx={(theme) => ({ color: theme.palette.success.main })}
                    >
                      Video uploaded successfully.
                    </Typography>
                  )}
                </Grid>

                <Grid
                  container
                  sx={{ padding: "1em 0" }}
                  justifyContent="flex-end"
                >
                  <SubmitButton>
                    {Boolean(recipe) ? "Update" : "Submit"}
                  </SubmitButton>
                </Grid>
              </Form>
            </Box>
          </Container>
        </Paper>
      </Box>
    </Container>
  );
};

const IngredientList = ({ name, list = [] }) => {
  const [searchValue, setSearchValue] = useState("");
  const [productItems, setProductItems] = useState(list);
  const [formatedProducts, setFormatedProducts] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [ingredientDialogOpen, setIngredientDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();

  const products = useSelector((state) => state.entities.products);

  const handleChange = (value, key) => {
    setSearchValue(value);
    if (searchValue && key === "Enter") dispatch(searchProducts(value));
  };

  const handleSelectItem = (item) => {
    setProductItems([...productItems, item]);
    setFormatedProducts([
      ...formatedProducts,
      { product: item._id, quantity: item.quantity },
    ]);
    setFieldValue(name, [
      ...formatedProducts,
      { product: item._id, quantity: item.quantity },
    ]);
    dispatch(clearSearch());
    setSearchValue("");
  };

  const handleDeleteItem = (item) => {
    setProductItems(productItems.filter((i) => i._id !== item._id));
    const remainingFomattedProducts = formatedProducts.filter(
      (i) => i.product !== item._id
    );
    setFormatedProducts(remainingFomattedProducts);
    setFieldValue(name, remainingFomattedProducts);
  };

  const openEditDialog = (item) => {
    setCurrentIngredient(item);
    setIngredientDialogOpen(true);
  };

  const handleIngredientEditSave = (item) => {
    const index = productItems.findIndex((p) => p._id === item._id);
    const clonedProducts = [...productItems];
    clonedProducts[index] = item;
    setProductItems(clonedProducts);

    const formatted = clonedProducts.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    setFieldValue(name, formatted);
  };

  useEffect(() => {
    setFormatedProducts(productItems.map((item) => ({ product: item._id })));
  }, []);
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
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Grid item>
                      <AppListItem
                        key={item._id}
                        avatarShown
                        avatarUrl={item.image.url}
                        title={item.name}
                        subtitle={`Quantity: ${item.quantity || ""}`}
                      />
                    </Grid>

                    <Grid item>
                      <Grid container>
                        <Grid item>
                          <IconButton onClick={() => openEditDialog(item)}>
                            <Edit sx={{ fontSize: "0.8em" }} />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => handleDeleteItem(item)}>
                            <Delete sx={{ fontSize: "0.8em" }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
          <IngredientEditDialog
            open={ingredientDialogOpen}
            onClose={() => setIngredientDialogOpen(false)}
            onSave={(value) => handleIngredientEditSave(value)}
            item={currentIngredient}
          />
        </Box>
      </Box>
    </Box>
  );
};

const IngredientEditDialog = ({ open, onClose, item, onSave }) => {
  const [ingredient, setIngredient] = useState(null);

  const raiseSave = (item) => {
    onSave(ingredient);
    onClose();
  };

  const handleChange = ({ target: input }) => {
    const editedItem = Object.assign({}, item, {
      quantity: Number(input.value),
    });
    item = editedItem;
    setIngredient(item);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Ingredient</DialogTitle>
      <DialogContent>
        <Box>
          <AppListItem
            avatarShown
            avatarUrl={item?.image?.url || "none"}
            title={item?.name || ""}
          />
        </Box>

        <Box>
          <Grid container justifyContent={"flex-end"}>
            <TextField
              onChange={handleChange}
              label="Quantity"
              type="number"
              placeholder="Input new value..."
            />
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button onClick={raiseSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(EditRecipe);
