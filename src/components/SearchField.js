import React from "react";
import { InputAdornment, InputBase, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchField = ({ placeholder = "Search...", ...rest }) => {
  const theme = useTheme();

  return (
    <InputBase
      fullWidth
      placeholder={placeholder}
      startAdornment={
        <InputAdornment sx={{ padding: "0 0.5em" }}>
          <Search />
        </InputAdornment>
      }
      sx={{
        backgroundColor: theme.palette.common.extraLight,
        padding: 0.5,
        borderRadius: 2,
      }}
      {...rest}
    />
  );
};

export default SearchField;
