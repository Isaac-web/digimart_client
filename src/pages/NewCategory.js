import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import * as Yup from "yup";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import { Save } from "@mui/icons-material";

const NewCategory = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required().label("Category Name"),
    description: Yup.string().max(500).label("Description"),
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Paper
        sx={(theme) => ({ width: "100%", borderRadius: theme.rounded.medium })}
        variant="outlined"
      >
        <Container maxWidth="sm" sx={{ padding: 8 }}>
          <Box>
            <Typography variant="h4">New Category</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Fill out the fields to add a new category
            </Typography>
          </Box>

          <Box>
            <Form
              initialValues={{ name: "", category: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Grid conatiner>
                <FormTextField autoFocus name="name" label="Category Name" />

                <Box sx={{ marginBottom: 2 }} />
                <FormTextField
                  name="description"
                  multiline
                  rows={4}
                  label="Category Name"
                />
              </Grid>

              <Box sx={{ marginBottom: 5 }} />
              <FormSubmitButton startIcon={<Save />}>Save</FormSubmitButton>
            </Form>
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

export default NewCategory;
