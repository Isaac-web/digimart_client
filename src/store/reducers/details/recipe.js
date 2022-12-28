import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    errorMessage: "",
    data: {},
  },
  reducers: {
    recipeFetched: (recipe, action) => {
      recipe.data = action.payload.data;
    },
    recipeFetchBegan: (recipe) => {
      recipe.loading = true;
    },
    recipeFetchEnded: (recipe) => {
      recipe.loading = false;
    },
    recipeCleared: (recipe) => {
      recipe.data = {};
      recipe.loading = false;
      recipe.errorMessage = "";
    },
  },
});

export default slice.reducer;
const { recipeFetchBegan, recipeFetched, recipeFetchEnded, recipeCleared } =
  slice.actions;

const url = "/recipes";
export const fetchRecipe = (id) => async (dispatch, getStore) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      onBegin: recipeFetchBegan.type,
      onEnd: recipeFetchEnded.type,
      onSuccess: recipeFetched.type,
    })
  );
};

export const updateRecipe = (id, data, callback) => async (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      data,
      method: "put",
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );

  if (typeof callback === "function") callback();
};

export const clearRecipe = () => (dispatch) => {
  dispatch(recipeCleared());
};