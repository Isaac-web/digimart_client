import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "branch",
  initialState: {
    loading: false,
    data: {},
  },
  reducers: {
    branchLoaded: (branch, action) => {
      branch.data = action.payload.data;
    },
    branchLoadBegan: (branch) => {
      branch.loading = true;
    },
    branchLoadEnded: (branch) => {
      branch.loading = false;
    },
    branchCleared: (branch) => {
      branch.data = {};
    },
  },
});

export default slice.reducer;
const { branchLoadEnded, branchLoadBegan, branchLoaded, branchCleared } =
  slice.actions;

export const url = "/branches";
export const fetchBranch = (id) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      onSuccess: branchLoaded.type,
      onBegin: branchLoadBegan.type,
      onEnd: branchLoadEnded.type,
      toggleOnError: true,
    })
  );
};

export const clearBranch = () => (dispatch) => {
  dispatch(branchCleared());
};
