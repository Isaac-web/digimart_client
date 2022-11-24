import React, { useEffect } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import { fetchBranch, clearBranch } from "../store/reducers/details/branch";
import { updateBranch } from "../store/reducers/entities/branches";
import AppProgress from "../components/AppProgress";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().max(100).label("Branch Name"),
  description: Yup.string().max(500).label("Branch description"),
});

const NewBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: branchId } = useParams();

  const branch = useSelector((state) => state.details.branch);

  const handleSubmit = (data) => {
    dispatch(updateBranch(branchId, data, () => navigate("/branches")));
  };

  useEffect(() => {
    dispatch(fetchBranch(branchId));

    return () => {
      dispatch(clearBranch());
    };
  }, []);

  if (branch.loading) {
    return (
      <AppProgress
        title="Please wait"
        subtitle={"We are the necessary data..."}
      />
    );
  }

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
            Edit Branch
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            Modify the details and save changes to update
          </Typography>
        </Box>

        <Box>
          <Form
            initialValues={{
              name: branch.data.name,
              description: branch.data.description,
            }}
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
                <FormSubmitButton xs={12}>Update</FormSubmitButton>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewBranch;
