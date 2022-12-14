import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "recipeCategories",
  initialState: {
    loading: false,
    deleting: false,
    posting: false,
    data: {
      count: 0,
      currentPage: 0,
      items: [],
    },
  },
  reducers: {
    categoryAdded: (categories, action) => {
      categories.data.items.push(action.payload.data);
    },
    categoryAddBegan: (categories) => {
      categories.posting = true;
    },
    categoryAddEnded: (categories) => {
      categories.posting = false;
    },
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
    categoryDeleted: (categories, action) => {
      categories.data.items = categories.data.items.filter(
        (item) => item._id !== action.payload.data._id
      );
    },
    categoryDeleteBegan: (categories) => {
      categories.deleting = true;
    },
    categoryDeleteEnded: (categories) => {
      categories.deleting = false;
    },
  },
});

export default slice.reducer;
const {
  categoriesFetched,
  categoriesFetchBegan,
  categoriesFetchEnded,
  categoryDeleted,
  categoryDeleteBegan,
  categoryDeleteEnded,
  categoryAdded,
  categoryAddBegan,
  categoryAddEnded,
} = slice.actions;

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

export const deleteCategory = (category) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${category._id}`,
      method: "delete",
      onSuccess: categoryDeleted.type,
      onBegin: categoryDeleteBegan.type,
      onEnd: categoryDeleteEnded.type,
      toggleOnError: true,
    })
  );
};

export const addCategory = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url,
      method: "post",
      data,
      onBegin: categoryAddBegan.type,
      onEnd: categoriesFetchEnded.type,
      onSuccess: categoryAdded.type,
      toggleOnError: true,
    })
  );

  if (callback) callback();
};



