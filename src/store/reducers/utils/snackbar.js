import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    severity: "info",
    duration: 3500,
  },
  reducers: {
    notificationShown: (snackbar, action) => {
      snackbar.message = action.payload.message;
      snackbar.severity = action.payload.severity;
      snackbar.open = true;
    },

    notificationHidden: (snackbar, action) => {
      snackbar.open = false;
    },
  },
});

export default slice.reducer;
const { notificationHidden, notificationShown } = slice.actions;

export const showSnackbar = (payload) => (dispatch) => {
  dispatch(
    notificationShown({
      message: payload.message,
      severity: payload.severity,
      open: true,
    })
  );
};

export const hideSnackbar = (payload) => (dispatch) => {
  dispatch(
    notificationHidden({
      open: false,
    })
  );
};
