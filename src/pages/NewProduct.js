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
import { Save } from "@mui/icons-material";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { fetchCategories } from "../store/reducers/entities/categories";
import { createProduct } from "../store/reducers/entities/products";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import AppImagePicker from "../components/AppImagePicker";
import FormSelectField from "../components/form/FormSelectField";
import AppProgress from "../components/AppProgress";

const NewProduct = () => {
  const [image, setImage] = useState(null);
  const { matchesMD } = useContext(AppContext);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data } = useSelector((state) => state.entities.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleImageLoad = (image) => {
    setImage(image);
  };

  const handleSubmit = (data) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      console.log("Form Data", formData.entries());
    }

    dispatch(createProduct(data, () => navigate("/products")));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required(),
    price: Yup.number().min(0).max(10000).required(),
    categoryId: Yup.string().required().label("Category"),
    desc: Yup.string().max(500),
  });

  if (loading)
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
              <Typography variant="h4">New Product</Typography>
              <Typography
                gutterBottom
                variant="subtitle2"
                sx={{ marginBottom: 5 }}
              >
                Fill out the details to create a new product
              </Typography>
            </Box>

            <Box>
              <Form
                initialValues={{
                  name: "",
                  categoryId: "",
                  price: "",
                  desc: "",
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
                    items={data}
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
                        control={<Switch />}
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




export default NewProduct;
