import React, { useEffect } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import AppProgress from "../components/AppProgress";
import { updateCategory } from "../store/reducers/entities/categories";
import {
  clearCategory,
  loadCategory,
} from "../store/reducers/details/category";

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.details.category);
  console.log(data.name);
  console.log(data.desc);

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required().label("Category Name"),
    description: Yup.string().max(500).label("Description"),
  });

  useEffect(() => {
    dispatch(loadCategory(id));

    return () => {
      dispatch(clearCategory());
    };
  }, []);

  const handleSubmit = (data) => {
    dispatch(
      updateCategory(id, data, () => navigate("/categories", { replace: true }))
    );
  };

  return (
    <Container>
      <Paper
        sx={(theme) => ({ width: "100%", borderRadius: theme.rounded.medium })}
        variant="outlined"
      >
        {loading ? (
          <AppProgress subtitle="Please wait as we load the data." />
        ) : (
          <Container maxWidth="sm" sx={{ padding: 8 }}>
            <Box>
              <Typography variant="h4">Update Category</Typography>
              <Typography variant="subtitle2" gutterBottom>
                Fill out the fields to add a new category
              </Typography>
            </Box>

            <Box>
              <Form
                initialValues={{
                  name: data?.name,
                  desc: data?.desc,
                }}
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
        )}
      </Paper>
    </Container>
  );
};

export default UpdateCategory;
