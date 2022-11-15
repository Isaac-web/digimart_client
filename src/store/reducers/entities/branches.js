import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "branches",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    branchesFetchBegan: (branches) => {
      branches.loading = true;
    },
    branchesFetchEnded: (branches) => {
      branches.loading = false;
    },
    branchesFetched: (branches, action) => {
      branches.data = action.payload.data;
    },
  },
});

export default slice.reducer;
const { branchesFetchBegan, branchesFetchEnded, branchesFetched } =
  slice.actions;

export const fetchBranches = () => (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: branchesFetchBegan.type,
      onEnd: branchesFetchEnded.type,
      onSuccess: branchesFetched.type,
      url: "/branches",
    })
  );
};
