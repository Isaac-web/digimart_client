import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "capitalize",
          minWidth: "100px",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          overflow: "hidden",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(100, 100, 100, 0.1)",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            cursor: "pointer",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
  palette: {
    common: {
      black: "#000000",
      dark: "#2E2F30",
      extraLight: "#eceff1",
      light: "#E7EBF0",
      medium: "#737578",
      white: "#FFFFFF",
    },
    primary: {
      main: "#980200",
    },
  },
});

export default theme;
