import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import FormDatePicker from "../components/form/FormDatePicker";
import FormSelectField from "../components/form/FormSelectField";
import { fetchBranches } from "../store/reducers/entities/branches";
import { fetchDesignations } from "../store/reducers/entities/designations";
import { createEmployee } from "../store/reducers/entities/employees";
import AppProgress from "../components/AppProgress";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  middlename: Yup.string(),
  dateOfBirth: "",
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  address: Yup.string().min(3).required(),
  digitalAddress: Yup.string(),
  salary: Yup.number().min(0).required(),
  imageUri: Yup.string(),
  branchId: Yup.string().required(),
  designationId: Yup.string().required(),
});

const NewEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: branches, loading: loadingBranches } = useSelector(
    (state) => state.entities.branches
  );
  const { data: designations, loading: loadingDesigations } = useSelector(
    (state) => state.entities.designations
  );

  const handleSubmit = (data) => {
    dispatch(
      createEmployee(data, () => navigate("/employees", { replace: true }))
    );
  };

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDesignations());
  }, []);

  if (loadingBranches || loadingDesigations) return <AppProgress />;

  return (
    <Container sx={{ paddingBottom: "3em" }}>
      <Paper
        variant="outlined"
        sx={(theme) => ({ borderRadius: theme.rounded.medium, padding: "3em" })}
      >
        <Container maxWidth="sm">
          <Box>
            <Typography variant="h4">New Employee</Typography>
            <Typography sx={{ marginBottom: "1em" }} variant="subtitle2">
              Fill out the form below to create a new employee
            </Typography>
          </Box>

          <Form
            initialValues={{
              firstname: "Testing",
              lastname: "Testing",
              middlename: "Testing",
              dateOfBirth: null,
              email: "test@gmail.com",
              phone: "5555555555",
              address: "line 1, line 2, line 3",
              digitalAddress: "1122A334sABZ",
              salary: "2000",
              imageUri: "",
              branchId: "",
              designationId: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Grid container spacing={3}>
              <FormTextField autoFocus label="Firstname" name="firstname" />
              <FormTextField label="Lastname" name="lastname" />
              <FormTextField label="Middle Name" name="middlename" />
              <FormDatePicker
                label="Date of birth"
                name="dateOfBirth"
                renderInput={(params) => <TextField {...params} />}
              />
              <FormTextField label="Email" name="email" />
              <FormTextField label="Phone" name="phone" />
              <FormSelectField
                inputLabel={"Branch"}
                name="branchId"
                items={branches}
                menuItemLabelAttribute="name"
                menuItemValueAttribute={"_id"}
                xs={6}
              />
              <FormSelectField
                inputLabel={"Job Title"}
                name="designationId"
                items={designations}
                menuItemLabelAttribute="value"
                menuItemValueAttribute={"_id"}
                xs={6}
              />
              <FormTextField
                label="Salary"
                name="salary"
                xs={12}
                type="number"
              />
              <FormTextField label="Address" name="address" xs={12} />
              <FormTextField
                label="Digital Address"
                name="digitalAddress"
                xs={12}
              />
            </Grid>

            <Box sx={{ marginTop: "2em", marginBottom: "2em" }}>
              <FormSubmitButton>Submit</FormSubmitButton>
            </Box>
          </Form>
        </Container>
      </Paper>
    </Container>
  );
};

export default NewEmployee;
