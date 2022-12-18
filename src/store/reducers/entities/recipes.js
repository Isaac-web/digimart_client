import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "recipes",
  initialState: {
    loading: false,
    posting: true,
    data: {
      count: 0,
      currentPage: 0,
      pageSize: null,
      items: [],
    },
  },
  reducers: {
    recipesFetched: (recipes, action) => {
      recipes.data.items = action.payload.data.recipes;
      recipes.data.currentPage = action.payload.data.currentPage;
      recipes.data.pageSize = action.payload.data.pageSize;
      recipes.data.count = action.payload.data.count;
    },
    recipesFetchBegan: (recipes) => {
      recipes.loading = true;
    },
    recipesFetchEnded: (recipes) => {
      recipes.loading = false;
    },
    recipeDeleted: (recipes, action) => {
      const index = recipes.data.items.findIndex(
        (r) => r._id === action.payload.id
      );
      recipes.data.items.splice(index, 1);
    },
    recipeAdded: (recipes, action) => {
      recipes.data.items.push(action.payload.data);
    },
    recipeAddBegan: (recipes) => {
      recipes.posting = true;
    },
    recipeAddEnded: (recipes) => {
      recipes.posting = false;
    },
  },
});

export default slice.reducer;
const {
  recipesFetched,
  recipesFetchEnded,
  recipesFetchBegan,
  recipeDeleted,
  recipeAddBegan,
  recipeAdded,
  recipeAddEnded,
} = slice.actions;

const url = "/recipes";
export const fetchRecipes = (params) => (dispatch) => {
  dispatch(
    apiRequest({
      url,
      params,
      onSuccess: recipesFetched.type,
      onBegin: recipesFetchBegan.type,
      onEnd: recipesFetchEnded.type,
    })
  );
};

export const deleteRecipe = (id) => (dispatch) => {
  dispatch(recipeDeleted({ id }));

  dispatch(
    apiRequest({
      url: `/recipes/${id}`,
      method: "delete",
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );
};

export const addRecipe = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url,
      data,
      method: "post",
      toggleOnError: true,
      onSuccess: recipeAdded.type,
      onBegin: recipeAddBegan.type,
      onEnd: recipeAddEnded.type,
    })
  );

  if (typeof callback === "function") callback();
};
