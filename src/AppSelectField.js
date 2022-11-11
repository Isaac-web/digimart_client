import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const AppSelectField = ({
  fullWidth = true,
  items,
  inputLabel,
  label,
  menuItemLabelAttribute,
  menuItemValueAttribute,
  name,
  value,
  variant = "standard",
  errorMessage,
  ...rest
}) => {
  return (
    <>
      <FormControl
        fullWidth={fullWidth}
        variant={variant}
        error={errorMessage?.length ? true : false}
      >
        <InputLabel id={name} shrink>
          {inputLabel}
        </InputLabel>
        <Select name={name} label={label} value={value} {...rest}>
          {items?.map((item, index) => (
            <MenuItem
              key={index.toString()}
              value={item[menuItemValueAttribute]}
            >
              {item[menuItemLabelAttribute]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorMessage?.length && (
        <Typography
          variant="subtitle2"
          sx={(theme) => ({
            fontSize: "0.7em",
            marginTop: "0.5em",
            color: "rgba(220, 0, 0, 1)",
          })}
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default AppSelectField;
