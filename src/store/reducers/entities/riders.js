import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "riders",
  initialState: {
    loading: true,
    data: [],
  },
  reducers: {
    ridersLoaded: (riders, action) => {
      riders.data = action.payload.data;
    },
    ridersLoadBegan: (riders) => {
      riders.loading = true;
    },
    ridersLoadEnded: (riders) => {
      riders.loading = false;
    },
  },
});

export default slice.reducer;
const { ridersLoadBegan, ridersLoadEnded, ridersLoaded } = slice.actions;

const url = "/employees";
export const fetchRiders = () => (dispatch) => {
  dispatch(
    apiRequest({
      url,
      onSuccess: ridersLoaded.type,
      onBegin: ridersLoadBegan.type,
      onEnd: ridersLoadEnded.type,
    })
  );
};
