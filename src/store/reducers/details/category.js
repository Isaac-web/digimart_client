import { createSlice } from "@reduxjs/toolkit";
// import apiRequest from "../../middleware/api";
import categories, { fetchCategories } from "../entities/categories";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    data: {},
  },
  reducers: {
    categoryFetched: (category, action) => {
      category.data = action.payload.data;
    },
    categoryFetchedBegan: (category, action) => {
      category.loading = true;
    },
    categoryFetchedEnded: (category, action) => {
      category.loading = false;
    },
    categoryCleared: (category, action) => {
      category.data = {};
    },
  },
});

export default slice.reducer;
const {
  categoryFetched,
  categoryFetchedBegan,
  categoryFetchedEnded,
  categoryCleared,
} = slice.actions;

export const loadCategory = (id) => async (dispatch) => {
  dispatch({
    type: apiRequest.type,
    payload: {
      url: `/categories/${id}`,
      onBegin: categoryFetchedBegan.type,
      onEnd: categoryFetchedEnded.type,
      onSuccess: categoryFetched.type,
    },
  });
};

export const clearCategory = () => (dispatch) => {
  dispatch(categoryCleared());
};
