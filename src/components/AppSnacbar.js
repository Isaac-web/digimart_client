import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";

const AppSnacbar = ({ message, open, severity, ...rest }) => {
  const snackbar = useSelector((state) => state.snackbar);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      ContentProps={{ style: { minWidth: "20em" } }}
      open={snackbar.open}
      {...rest}
    >
      <Alert sx={{ width: "100%", minWidth: 200 }} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnacbar;
