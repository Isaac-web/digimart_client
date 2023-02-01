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
import { getImagePresignedUrl, uploadAWSFile } from "../utils/uploader";

import { AppContext } from "../context/AppContext";
import { fetchCategories } from "../store/reducers/entities/categories";
import { createProduct } from "../store/reducers/entities/products";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import AppImagePicker from "../components/AppImagePicker";
import FormSelectField from "../components/form/FormSelectField";
import AppProgress from "../components/AppProgress";
import ProgressDialog from "../components/ProgressDialog";

const NewProduct = () => {
  const [image, setImage] = useState(null);
  const [available, setAvailable] = useState(true);
  const [priceFixed, setPriceFixed] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [progressDialogError, setProgressDialogError] = useState(false);
  const [progressDone, setProgressDone] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
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

  const closeProgressDialog = () => {
    setProgressDialogOpen(false);
  };

  const handleUploadProgress = (progressPercent) => {
    setProgressValue(progressPercent);

    if (progressPercent >= 100) setProgressDone(true);
  };

  const handleSubmit = async (data) => {
    if (image) {
      const { signedUrl, publicId, url } = await getImagePresignedUrl({
        path: "products",
      });
      console.log(url);
      setProgressDialogError(false);
      setProgressDialogOpen(true);
      const result = await uploadAWSFile(
        signedUrl,
        image,
        handleUploadProgress
      );
      if (!result.uploaded) setProgressDialogError(true);
      data.imageUri = url;
      data.imagePublicId = publicId;
    }
    data.status = available;
    data.priceFixed = priceFixed;
    dispatch(createProduct(data));
  };

  const handleSwitchChange = ({ target }) => setAvailable(target.checked);
  const handleSetPriceFixed = ({ target }) => setPriceFixed(target.checked);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required().label("Product Name"),
    price: Yup.number().min(0).max(10000).required().label("Price"),
    unit: Yup.string().min(3).max(50).required().label("Unit"),
    categoryId: Yup.string().required().label("Category"),
    status: Yup.boolean(),
    desc: Yup.string().max(500).label("Description"),
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
              <Typography variant="h5" fontWeight="bold">
                New Product
              </Typography>
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
                  unit: "",
                  desc: "",
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
                    items={data}
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
                  <FormTextField
                    xs={4}
                    label="Unit"
                    name="unit"
                    InputProps={{
                      startAdornment: (
                        <Typography
                          sx={(theme) => ({
                            color: theme.palette.common.medium,
                            fontSize: "0.7em",
                            marginRight: "0.3em",
                          })}
                        >
                          Per
                        </Typography>
                      ),
                    }}
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
                        control={
                          <Switch
                            checked={available}
                            onChange={handleSwitchChange}
                          />
                        }
                        labelPlacement="start"
                      />
                    </Tooltip>

                    <Tooltip title="Indicate whether product has a fixed price">
                      <FormControlLabel
                        label="Price Fixed"
                        control={
                          <Switch
                            checked={priceFixed}
                            onChange={handleSetPriceFixed}
                          />
                        }
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
        open={progressDialogOpen}
        onClose={closeProgressDialog}
        onCancel={closeProgressDialog}
        onDone={() => navigate("/products")}
        loaded={progressValue}
        title="Data Upload"
        error={progressDialogError}
        done={progressDone}
      />
    </Container>
  );
};

export default NewProduct;
