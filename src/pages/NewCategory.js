import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import { createCategory } from "../store/reducers/entities/categories";

const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required().label("Category Name"),
    description: Yup.string().max(500).label("Description"),
  });

  const handleSubmit = (data) => {
    dispatch(createCategory(data, () => navigate("/categories", { replace: true })));
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
              initialValues={{ name: "", desc: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Grid container direction="column">
                <FormTextField autoFocus name="name" label="Category Name" />

                <Box sx={{ marginBottom: 2 }} />
                <FormTextField
                  name="desc"
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
