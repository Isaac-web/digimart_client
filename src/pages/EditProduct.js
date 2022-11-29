import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Tooltip,
  useTheme,
} from "@mui/material";
import { ConstructionOutlined, Save } from "@mui/icons-material";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { fetchCategories } from "../store/reducers/entities/categories";
import { createProduct } from "../store/reducers/entities/products";
import { fetchProduct, updateProduct } from "../store/reducers/details/product";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import AppImagePicker from "../components/AppImagePicker";
import FormSelectField from "../components/form/FormSelectField";
import AppProgress from "../components/AppProgress";
import ProgressDialog from "../components/ProgressDialog";
import { uploadFile } from "../utils/uploader";

const EditProduct = () => {
  const [image, setImage] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const [progressDialogOpen, setProgressDialogOpen] = useState(0);
  const [progressDone, setProgressDone] = useState(false);
  const [progressError, setProgressError] = useState(false);

  const { matchesMD } = useContext(AppContext);
  const theme = useTheme();
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.entities.categories);
  const product = useSelector((state) => state.details.product);

  useEffect(() => {
    dispatch(fetchProduct(productId));
    dispatch(fetchCategories());
  }, []);

  const handleImageLoad = (image) => {
    setImage(image);
  };

  const trackUploadProgress = (loaded, total) => {
    let loadedPercent = Math.floor(loaded * 100) / total;
    setLoaded(loadedPercent);
    if (loadedPercent >= 100) setProgressDone(true);
  };

  const handleSubmit = async (data) => {
    if (image) {
      setLoaded(0);
      setProgressDialogOpen(true);
      const result = await uploadFile(image, "products", trackUploadProgress);
      console.log(result);
      if (!result.uploaded) return setProgressError(true);
      data.imageUri = result?.url;
      data.imagePublicId = result?.public_id;
    }

    dispatch(
      updateProduct(productId, data, () =>
        navigate(`/products/${productId}`, { replace: true })
      )
    );
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required(),
    price: Yup.number().min(0).max(10000).required(),
    unit: Yup.string().min(3).max(50).required().label("Unit"),
    categoryId: Yup.string().required().label("Category"),
    status: Yup.boolean(),
    desc: Yup.string().max(500),
  });

  if (product.loading)
    return (
      <AppProgress
        title="Please Wait"
        subtitle="We are getting the necessary data"
      />
    );

  return (
    <Container sx={{ paddingBottom: "1em" }}>
      <Paper
        sx={{ width: "100%", borderRadius: theme.rounded.medium }}
        variant="outlined"
      >
        <Container maxWidth="md" sx={{ padding: 5 }}>
          <Box style={{ padding: matchesMD ? "0px" : "0 6em" }}>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Edit Product
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle2"
                sx={{ marginBottom: 5 }}
              >
                Update the exsiting data
              </Typography>
            </Box>

            <Box>
              <Form
                initialValues={{
                  name: product.data.name,
                  categoryId: product.data.category._id,
                  price: product.data.price,
                  unit: product.data.unit || "",
                  desc: product.data.desc,
                  status: true,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Grid container spacing={2}>
                  <FormTextField autoFocus label="Name" name="name" />
                  <FormSelectField
                    name="categoryId"
                    inputLabel={"Category"}
                    menuItemLabelAttribute={"name"}
                    menuItemValueAttribute={"_id"}
                    items={categories.data}
                  />
                  <FormTextField
                    xs={8}
                    label="Price"
                    type={"number"}
                    name="price"
                    InputProps={{
                      startAdornment: (
                        <Typography
                          sx={(theme) => ({
                            color: theme.palette.common.medium,
                            fontSize: "0.7em",
                            marginRight: "0.3em",
                          })}
                        >
                          Ghc
                        </Typography>
                      ),
                    }}
                  />
                  <FormTextField xs={4} label="Unit" name="unit" InputProps={{
                      startAdornment: (
                        <Typography
                          sx={(theme) => ({
                            color: theme.palette.common.medium,
                            fontSize: "0.7em",
                            marginRight: "0.5em",
                          })}
                        >
                          Per
                        </Typography>
                      ),
                    }} />

                  <FormTextField
                    label="Description"
                    name="desc"
                    multiline
                    xs={12}
                    rows={5}
                  />

                  <Grid item xs={12}>
                    <AppImagePicker label="Photo" onChange={handleImageLoad} />
                  </Grid>
                  <Grid item container sx={{ padding: "1em 0" }}>
                    <Tooltip title="Indicate whether product is available">
                      <FormControlLabel
                        label="Available"
                        control={<Switch checked={"checked"} />}
                        labelPlacement="start"
                      />
                    </Tooltip>
                  </Grid>
                  <FormSubmitButton sm={12} md={6} startIcon={<Save />}>
                    Save
                  </FormSubmitButton>
                </Grid>
              </Form>
            </Box>
          </Box>
        </Container>
      </Paper>
      <ProgressDialog
        title="Data Upload"
        open={progressDialogOpen}
        loaded={loaded}
        onDone={() => {
          navigate(`/products/${product._id}`);
        }}
        done={progressDone}
        error={progressError}
        onClose={() => setProgressDialogOpen(false)}
      />
    </Container>
  );
};

export default EditProduct;
