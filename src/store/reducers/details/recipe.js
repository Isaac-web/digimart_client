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
      console.log(true);
      recipe.loading = true;
    },
    recipeFetchEnded: (recipe) => {
      console.log(false);
      recipe.loading = true;
    },
  },
});

export default slice.reducer;
const { recipeFetchBegan, recipeFetched, recipeFetchEnded } = slice.actions;

const url = "/recipes";
export const fetchRecipe = (id) => async (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      onSuccess: recipeFetched.type,
      onBegin: recipeFetchBegan.type,
      onEnd: recipeFetchEnded.type,
    })
  );
};
