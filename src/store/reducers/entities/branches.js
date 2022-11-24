import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "branches",
  initialState: {
    loading: false,
    creating: false,
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
    branchCreated: (branches, action) => {
      branches.data.push(action.payload.data);
    },
    branchCreateBegun: (branches) => {
      branches.creating = true;
    },
    branchCreateEnded: (branches) => {
      branches.creating = false;
    },
    branchDeleted: (branches, action) => {
      const index = branches.data.findIndex((b) => b._id === action.payload.id);
      branches.data.splice(index, 1);
    },
    branchUpdated: (branch, action) => {
      console.log(action.payload.data);
    },
  },
});

export default slice.reducer;
const {
  branchesFetchBegan,
  branchesFetchEnded,
  branchesFetched,
  branchCreateBegun,
  branchCreateEnded,
  branchCreated,
  branchDeleted,
  branchUpdated,
} = slice.actions;

const url = "/branches";
export const fetchBranches = () => (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: branchesFetchBegan.type,
      onEnd: branchesFetchEnded.type,
      onSuccess: branchesFetched.type,
      url,
    })
  );
};

export const createBranch = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      method: "post",
      data,
      url,
      onBegin: branchCreateBegun.type,
      onEnd: branchCreateEnded.type,
      onSuccess: branchCreated.type,
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );

  if (callback) callback();
};

export const deleteBranch = (id) => (dispatch) => {
  dispatch(branchDeleted(id));
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      method: "delete",
      toggleOnSuccess: true,
      toggleOnError: true,
    })
  );
};

export const updateBranch = (id, data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url: `${url}/${id}`,
      method: "patch",
      data,
      onSuccess: branchUpdated.type,
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );

  if (callback) callback();
};