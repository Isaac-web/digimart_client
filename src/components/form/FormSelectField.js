import React from "react";
import { Grid } from "@mui/material";
import { useFormikContext } from "formik";

import AppSelectField from "../../AppSelectField";

const FormSelectField = ({
  name,
  items = [],
  inputLabel,
  lg,
  md,
  menuItemLabelAttribute,
  menuItemValueAttribute,
  sm,
  xl,
  xs,
}) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  const handleChange = ({ target: input }) => {
    setFieldValue(name, input.value);
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <AppSelectField
        name={name}
        inputLabel={inputLabel}
        onChange={handleChange}
        value={values[name]}
        items={items}
        menuItemLabelAttribute={menuItemLabelAttribute}
        menuItemValueAttribute={menuItemValueAttribute}
        errorMessage={touched[name] && errors[name]}
      />
    </Grid>
  );
};

export default FormSelectField;
