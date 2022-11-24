import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../store/reducers/utils/snackbar";

const AppSnacbar = ({ message, open, severity, ...rest }) => {
  const snackbar = useSelector((state) => state.snackbar);
  const dispatch = useDispatch()

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      ContentProps={{ style: { minWidth: "20em" } }}
      autoHideDuration={snackbar.duration}
      open={snackbar.open}
      {...rest}
      onClose={() => dispatch(hideSnackbar())}
    >
      <Alert sx={{ width: "100%", minWidth: 200 }} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnacbar;
