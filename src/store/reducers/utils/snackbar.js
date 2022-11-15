import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    severity: "info",
    duration: 5000,
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
