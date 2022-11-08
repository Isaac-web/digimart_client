import React from "react";
import { InputAdornment, InputBase, Paper, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchField = ({ placeholder = "Search...", PaperProps, ...rest }) => {
  const theme = useTheme();

  return (
    <Paper sx={{ borderRadius: theme.rounded.small }} {...PaperProps}>
      <InputBase
        startAdornment={
          <InputAdornment sx={{ marginRight: "0.4em", marginLeft: 0.3 }}>
            <Search />
          </InputAdornment>
        }
        sx={{
          backgroundColor: theme.palette.grey[50],
          borderRadius: "20px",
          padding: "0.3em",
        }}
        fullWidth
        placeholder={placeholder}
        {...rest}
      />
    </Paper>
  );
};

export default SearchField;
