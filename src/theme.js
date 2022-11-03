import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "capitalize",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: 10,
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
      white: "#FFFFFF",
    },
    primary: {
      main: "#980200",
    },
  },
});

export default theme;
