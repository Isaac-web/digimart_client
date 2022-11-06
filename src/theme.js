import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiAvatar: {
      defaultProps: {
        variant: "rounded",
      },
      styleOverrides: {
        root: {
          borderRadius: "0.4em",
        },
      },
    },
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
    MuiDialog: {
      defaultProps: {
        PaperProps: { variant: "outlined", sx: { borderRadius: 3 } },
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
          color: "red",
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
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontWeight: "bold",
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
  rounded: {
    small: "0.5em",
    medium: "1em",
    large: "3em",
    full: "50%",
  },
});

export default theme;
