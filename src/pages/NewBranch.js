import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import { createBranch } from "../store/reducers/entities/branches";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(100).label("Branch Name"),
  description: Yup.string().max(500).label("Branch description"),
});

const NewBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const branches = useSelector((state) => state.entities.branches);

  const handleSubmit = (data) => {
    dispatch(createBranch(data, () => navigate("/branches")));
  };

  return (
    <Container maxWidth={"md"}>
      <Paper
        sx={(theme) => ({
          borderRadius: theme.rounded.medium,
          padding: "3em",
        })}
      >
        <Box sx={{ marginBottom: "2em" }}>
          <Typography variant="h5" fontWeight="bold">
            New Branch
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            Fill out the details to create a new branch
          </Typography>
        </Box>

        <Box>
          <Form
            initialValues={{ name: "", description: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Grid container spacing={3}>
              <FormTextField autoFocus xs={8} name="name" label="Name" />
              <FormTextField
                multiline
                rows={4}
                xs={12}
                name="description"
                label="Description"
              />
              <Grid item container xs={6} sx={{ paddingTop: "1.5em" }}>
                <FormSubmitButton xs={12}>Submit</FormSubmitButton>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewBranch;
