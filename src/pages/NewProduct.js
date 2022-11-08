import React, { useContext, useState } from "react";
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

import { AppContext } from "../context/AppContext";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import AppImagePicker from "../components/AppImagePicker";

const NewProduct = () => {
  const [image, setImage] = useState(null);
  const { matchesMD } = useContext(AppContext);
  const theme = useTheme();

  const handleImageLoad = (image) => {
    setImage(image);
  };

  const handleSubmit = (data) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      console.log("Form Data", formData.entries());
      console.log(data);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required(),
    price: Yup.number().min(0).max(10000).required(),
    category: Yup.string().min(3).max(100).required(),
    description: Yup.string().max(500),
  });

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
                  category: "",
                  price: "",
                  description: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Grid container spacing={2}>
                  <FormTextField autoFocus label="Name" name="name" />
                  <FormTextField label="Price" type={"number"} name="price" />
                  <FormTextField xs={12} label="Category" name="category" />
                  <FormTextField
                    label="Description"
                    name="description"
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
