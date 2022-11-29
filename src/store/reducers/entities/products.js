import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    searching: false,
    data: [],
    searchResults: [],
  },
  reducers: {
    productsFetched: (products, action) => {
      products.data = action.payload.data;
    },
    productAdded: (products, action) => {
      products.data?.unshift(action.payload.data);
    },
    productRemoved: (products, action) => {
      const index = products.data.findIndex(
        (item) => item._id === action.payload._id
      );
      products.data.splice(index, 1);
    },
    productFetchBegan: (products, action) => {
      products.loading = true;
    },
    productFetchEnded: (products, action) => {
      products.loading = false;
    },
    searchResultsFetched: (products, action) => {
      products.searchResults = action.payload.data;
    },
    searchBegan: (products) => {
      products.searching = true;
    },
    searchEnded: (products) => {
      products.searching = false;
    },
    searchCleared: (products) => {
      products.searchResults = [];
    },
  },
});
export default slice.reducer;
const {
  productsFetched,
  productFetchBegan,
  productFetchEnded,
  productAdded,
  productRemoved,
  searchResultsFetched,
  searchBegan,
  searchEnded,
  searchCleared
} = slice.actions;

const url = "/products";
export const loadProducts = (data) => (dispatch) => {
  dispatch(productsFetched({ data }));

  dispatch(
    apiRequest({
      onBegin: productFetchBegan.type,
      onSuccess: productsFetched.type,
      onEnd: productFetchEnded.type,
      url,
    })
  );
};

export const createProduct = (data, callback) => async (dispatch) => {
  dispatch(
    apiRequest({
      data,
      onSuccess: productAdded.type,
      onEnd: productFetchEnded.type,
      method: "post",
      url,
      toggleOnError: true,
    })
  );

  if (callback) callback();
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productRemoved({ _id: id }));

  dispatch(
    apiRequest({
      toggleOnError: true,
      url: `${url}/${id}`,
      method: "delete",
      toggleOnSuccess: true,
    })
  );
};

export const searchProducts = (data) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/search?q=${data}`,
      onSuccess: searchResultsFetched.type,
      onBegin: searchBegan.type,
      onEnd: searchEnded.type,
      toggleOnError: true,
    })
  );
};


export const clearSearch = () => dispatch => {
  dispatch(searchCleared())
}