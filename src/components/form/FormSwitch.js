import React, { memo } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { useFormikContext } from "formik";

const FormSwitch = ({ label, labelPlacement = "start", name, ...rest }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleChange = ({ target }) => {
    setFieldValue(name, target.checked);
  };

  return (
    <FormControlLabel
      label={label}
      labelPlacement="start"
      control={
        <Switch
          name={name}
          checked={values[name]}
          onChange={handleChange}
          {...rest}
        />
      }
    />
  );
};

export default memo(FormSwitch);
