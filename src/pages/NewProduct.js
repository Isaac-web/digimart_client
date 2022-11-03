import React, { useContext } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";
import * as Yup from "yup";

import { AppContext } from "../context/AppContext";
import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";

const NewProduct = () => {
  const { matchesMD } = useContext(AppContext);
  const handleSubmit = (data) => {
    console.log(data);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required(),
    price: Yup.number().min(0).max(10000).required(),
    category: Yup.string().min(3).max(100).required(),
    description: Yup.string().max(500),
  });

  return (
    <Container>
      <Paper sx={{ width: "100%" }}>
        <Container maxWidth="md" sx={{ padding: 3 }}>
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
