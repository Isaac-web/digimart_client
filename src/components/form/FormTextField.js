import React from "react";
import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";

const FormTextField = ({ xs = 6, md, lg, sm, name, ...rest }) => {
  const { handleChange, errors, touched, values } = useFormikContext();
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        fullWidth
        error={Boolean(touched[name] && errors[name])}
        helperText={touched[name] && errors[name]}
        onChange={handleChange(name)}
        name={name}
        value={values[name]}
        {...rest}
      />
    </Grid>
  );
};

export default FormTextField;
