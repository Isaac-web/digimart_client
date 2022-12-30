import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AppDatePicker = ({ onChange, error, helperText, ...rest }) => {
  return (
    <DatePicker
      onChange={(newDate) => onChange(new Date(newDate))}
      renderInput={(params) => (
        <TextField error={true} fullWidth helperText={helperText} {...params} />
      )}
      {...rest}
    />
  );
};

export default AppDatePicker;
