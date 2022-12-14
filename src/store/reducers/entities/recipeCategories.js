import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "recipeCategories",
  initialState: {
    loading: false,
    data: {
      count: 0,
      currentPage: 0,
      items: [],
    },
  },
  reducers: {
    categoriesFetchBegan: (categories) => {
      categories.loading = true;
    },
    categoriesFetchEnded: (categories) => {
      categories.loading = false;
    },
    categoriesFetched: (categories, action) => {
      categories.data.count = action.payload.data.count;
      categories.data.items = action.payload.data.categories;
      categories.data.currentPage = action.payload.data.currentPage;
      categories.data.pageSize = action.payload.data.pageSize;
    },
  },
});

export default slice.reducer;
const { categoriesFetched, categoriesFetchBegan, categoriesFetchEnded } =
  slice.actions;

const url = "/recipe_categories";
export const fetchCategories = () => (dispatch) => {
  dispatch(
    apiRequest({
      url,
      toggleOnError: true,
      onBegin: categoriesFetchBegan.type,
      onEnd: categoriesFetchEnded.type,
      onSuccess: categoriesFetched.type,
    })
  );
};



