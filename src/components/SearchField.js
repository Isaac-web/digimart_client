import React from "react";
import {
  CircularProgress,
  InputAdornment,
  InputBase,
  Paper,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/system";

const SearchField = ({
  placeholder = "Search...",
  onChange,
  onClear,
  PaperProps,
  loading = false,
  ...rest
}) => {
  const theme = useTheme();

  const raiseKeyPress = ({ target, key }) => {
    if (onChange) {
      onChange(target.value, key);
    }
  };

  const raiseChange = ({ target: input }) => {
    if (!input.value) {
      if (onClear) onClear();
    }
  };

  return (
    <Paper sx={{ borderRadius: theme.rounded.small }} {...PaperProps}>
      <InputBase
        startAdornment={
          <InputAdornment
            position="start"
            sx={{ marginRight: "0.4em", marginLeft: 0.3 }}
          >
            {!loading ? (
              <Search />
            ) : (
              <Box
                sx={{
                  padding: "0 0.2em",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CircularProgress size="1.1em" />
              </Box>
            )}
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
        onKeyPress={raiseKeyPress}
        onChange={raiseChange}
      />
    </Paper>
  );
};

export default SearchField;
