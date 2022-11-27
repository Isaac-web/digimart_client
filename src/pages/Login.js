import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Form from "../components/form/Form";
import FormTextField from "../components/form/FormTextField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import { login } from "../store/reducers/auth/auth";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (data) => {
    dispatch(
      login(data, () => {
        window.location = "/home";
      })
    );
  };

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", paddingTop: "5em" }}
    >
      <Box sx={{ width: "25em" }}>
        <Grid container direction="column">
          <Grid item>
            <Typography align="center" variant="h5" fontWeight="bold">
              Login
            </Typography>
          </Grid>
          <Grid item container spacing={3}>
            <Form
              initialValues={{ email: "kanytakiy@gmail.com", password: "" }}
              onSubmit={handleSubmit}
            >
              <FormTextField autoFocus xs={12} name="email" label="Username" />
              <FormTextField
                name="password"
                label="Password"
                type="password"
                xs={12}
              />

              <FormSubmitButton xs={12} fullWidth loading={auth.loading}>
                Login
              </FormSubmitButton>
            </Form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
