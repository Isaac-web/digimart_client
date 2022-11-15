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

const EditProduct = () => {
  const [image, setImage] = useState(null);
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

  const handleSubmit = async (data) => {
    // if (image) {
    //   const result = await uploadImage(image);
    //   data.imageUri = result.url;
    // }

    dispatch(
      updateProduct(productId, data, () => navigate(`/products/${productId}`))
    );
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required(),
    price: Yup.number().min(0).max(10000).required(),
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
              <Typography variant="h4">Edit Product</Typography>
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
                  desc: product.data.desc,
                  status: true,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Grid container spacing={2}>
                  <FormTextField autoFocus label="Name" name="name" />
                  <FormTextField label="Price" type={"number"} name="price" />
                  <FormSelectField
                    xs={12}
                    name="categoryId"
                    inputLabel={"Category"}
                    menuItemLabelAttribute={"name"}
                    menuItemValueAttribute={"_id"}
                    items={categories.data}
                  />
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
    </Container>
  );
};

export default EditProduct;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "testing");

  const cloudName = "don6m08ed";

  const payload = { url: null, uploaded: false };
  try {
    const result = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    payload.url = result?.data.url;
    payload.uploaded = true;
  } catch (err) {
    payload.uploaded = false;
  }

  return payload;
};
