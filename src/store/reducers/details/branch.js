import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "branch",
  initialState: {
    loading: false,
    updating: false,
    data: {
      isOpen: false,
    },
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
    branchStatusUpdateBegan: (branch) => {
      branch.updating = true;
    },
    branchStatusUpdateEnded: (branch) => {
      branch.updating = false;
    },
    branchClosed: (branch) => {
      branch.data.isOpen = false;
    },
    branchOpened: (branch) => {
      branch.data.isOpen = true;
    },
  },
});

export default slice.reducer;
const {
  branchLoadEnded,
  branchLoadBegan,
  branchLoaded,
  branchCleared,
  branchStatusUpdateBegan,
  branchStatusUpdateEnded,
  branchClosed,
  branchOpened,
} = slice.actions;

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

export const closeBranch = (id) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/close/${id}`,
      method: "patch",
      onSuccess: branchClosed.type,
      onBegin: branchStatusUpdateBegan.type,
      onEnd: branchStatusUpdateEnded.type,
      toggleOnError: true,
    })
  );
};

export const openBranch = (id) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/open/${id}`,
      method: "patch",
      onSuccess: branchOpened.type,
      onBegin: branchStatusUpdateBegan.type,
      onEnd: branchStatusUpdateEnded.type,
      toggleOnError: true,
    })
  );
};







export const clearBranch = () => (dispatch) => {
  dispatch(branchCleared());
};
