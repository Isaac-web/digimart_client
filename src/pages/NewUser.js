import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  FormGroup,
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
import useUser from "../customHooks/useUser";

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
  password: Yup.string().min(10).max(128).required(),
  confirmPassword: Yup.string().min(10).max(128).required(),
});

const systemUserSchema = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  imageUri: Yup.string(),
  password: Yup.string().min(10).max(128).required(),
  confirmPassword: Yup.string().min(10).max(128).required(),
});

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();
  const [userType, setUserType] = useState("employee");

  const { data: branches, loading: loadingBranches } = useSelector(
    (state) => state.entities.branches
  );
  const { data: designations, loading: loadingDesigations } = useSelector(
    (state) => state.entities.designations
  );

  const handleSubmit = (data) => {
    if (userType === "system") {
      const userData = {
        email: "digimart_system@gmail.com",
        firstname: data.firstname,
        lastname: data.lastname,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      dispatch(
        createEmployee({ userData }, { userType }, () =>
          navigate("/employees", { replace: true })
        )
      );
    } else {
      dispatch(
        createEmployee(data, { userType }, () =>
          navigate("/employees", { replace: true })
        )
      );
    }
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
            <Typography variant="h5" fontWeight="bold">
              New Employee
            </Typography>
            <Typography sx={{ marginBottom: "1em" }} variant="subtitle2">
              Fill out the form below to create a new employee
            </Typography>
          </Box>

          {user.userType === "system" && (
            <Box sx={{ marginBottom: "2em" }}>
              <Typography variant="body2">Select the type of user:</Typography>
              <FormGroup>
                <FormControlLabel
                  name="userType"
                  label="Employee"
                  checked={Boolean(userType === "employee")}
                  sx={{ fontSize: "0.5em" }}
                  control={
                    <Radio
                      size="small"
                      onChange={() => {
                        setUserType("employee");
                      }}
                    />
                  }
                />
                <FormControlLabel
                  name="userType"
                  label="System"
                  sx={{ fontSize: "0.5em" }}
                  checked={Boolean(userType === "system")}
                  control={
                    <Radio
                      size="small"
                      onChange={() => {
                        setUserType("system");
                      }}
                    />
                  }
                />
              </FormGroup>
            </Box>
          )}

          {userType === "system"
            ? renderSystemUserForm(handleSubmit)
            : renderEmployeeForm(handleSubmit, branches, designations)}
        </Container>
      </Paper>
    </Container>
  );
};

const renderEmployeeForm = (handleSubmit, branches, designations) => {
  return (
    <Form
      initialValues={{
        firstname: "",
        lastname: "",
        middlename: "",
        dateOfBirth: null,
        email: "",
        phone: "",
        address: "",
        digitalAddress: "",
        salary: "",
        imageUri: "",
        branchId: "",
        designationId: "",
        password: "",
        confirmPassword: "",
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
          InputProps={{
            startAdornment: (
              <Typography
                variant="subtitle1"
                sx={(theme) => ({
                  color: theme.palette.common.Medium,
                  marginRight: "4px",
                })}
              >
                Ghc
              </Typography>
            ),
          }}
        />
        <FormTextField label="Address" name="address" xs={12} />
        <FormTextField label="Digital Address" name="digitalAddress" xs={12} />
        <FormTextField
          label="Password"
          name="password"
          xs={12}
          type="password"
        />
        <FormTextField
          label="Confirm Password"
          name="confirmPassword"
          xs={12}
          type="password"
        />
      </Grid>

      <Box sx={{ marginTop: "2em", marginBottom: "2em" }}>
        <FormSubmitButton>Submit</FormSubmitButton>
      </Box>
    </Form>
  );
};

const renderSystemUserForm = (handleSubmit) => {
  return (
    <Form
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        imageUri: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={systemUserSchema}
    >
      <Grid container spacing={3}>
        <FormTextField autoFocus label="Firstname" name="firstname" />
        <FormTextField label="Lastname" name="lastname" />
        <FormTextField xs={12} label="Email" name="email" />
        <FormTextField
          label="Password"
          name="password"
          xs={12}
          type="password"
        />
        <FormTextField
          label="Confirm Password"
          name="confirmPassword"
          xs={12}
          type="password"
        />
      </Grid>

      <Box sx={{ marginTop: "2em", marginBottom: "2em" }}>
        <FormSubmitButton>Submit</FormSubmitButton>
      </Box>
    </Form>
  );
};

export default User;
