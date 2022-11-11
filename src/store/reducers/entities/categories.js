import { createSlice } from "@reduxjs/toolkit";

import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "categories",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    categoriesFetchedStarted: (categories, action) => {
      categories.loading = true;
    },
    categoriesFetchedEnded: (categories, action) => {
      categories.loading = false;
    },
    categoriesFetched: (categories, action) => {
      categories.data = action.payload.data;
    },
    categoryAdded: (categories, action) => {
      categories.data.unshift(action.payload.data);
    },
    categoryDeleted: (categories, action) => {
      const index = categories.data.findIndex(
        (c) => c._id === action.payload.data._id
      );

      categories.data.splice(index, 1);
    },
    categoryUpdated: (categories, action) => {
      const index = categories.data.findIndex(
        (c) => c._id === action.payload.data._id
      );
      categories.data[index] = action.payload.data;
    },
  },
});

export default slice.reducer;
const {
  categoriesFetched,
  categoryAdded,
  categoryDeleted,
  categoryUpdated,
  categoriesFetchedEnded,
  categoriesFetchedStarted,
} = slice.actions;

const url = "/categories";
export const fetchCategories = () => (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: categoriesFetchedStarted.type,
      onEnd: categoriesFetchedEnded.type,
      onSuccess: categoriesFetched.type,
      url,
    })
  );
};

export const createCategory = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({ data, method: "post", onSuccess: categoryAdded.type, url })
  );

  callback();
};

export const updateCategory = (id, data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      onSuccess: categoryUpdated.type,
      url: `${url}/${id}`,
      data,
      method: "patch",
    })
  );

  if (callback) callback();
};

export const deleteCategory = (id) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      method: "delete",
      onSuccess: categoryDeleted.type,
    })
  );
};
