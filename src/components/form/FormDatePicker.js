import React from "react";
import { useFormikContext } from "formik";
import { Grid } from "@mui/material";

import AppDatePicker from "../AppDatePicker";

const FormDatePicker = ({ name, xs = 6, sm, md, lg, xl, ...rest }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <AppDatePicker
        name={name}
        onChange={(newDate) => setFieldValue(name, newDate.toString())}
        value={values[name]}
        helperText={touched[name] && errors[name]}
        error={touched[name] && errors[name]}
        {...rest}
      />
    </Grid>
  );
};

export default FormDatePicker;
