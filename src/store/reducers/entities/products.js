import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    searching: false,
    data: {
      count: 0,
      currentPage: 0,
      pageSize: 0,
      currentCategoryId: "none",
      items: [],
    },
    searchResults: [],
  },
  reducers: {
    productsFetched: (products, action) => {
      products.data.items = action.payload.data.products;
      products.data.count = action.payload.data.count;
      products.data.currentPage = action.payload.data.currentPage;
      products.data.pageSize = action.payload.data.pageSize;
    },
    productAdded: (products, action) => {
      products.data?.unshift(action.payload.data);
    },
    productRemoved: (products, action) => {
      const index = products.data.items.findIndex(
        (item) => item._id === action.payload._id
      );
      products.data.items.splice(index, 1);
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
    currentCategoryIdSet: (products, action) => {
      products.data.currentCategoryId = action.payload.categoryId || "none";
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
  searchCleared,
  currentCategoryIdSet
} = slice.actions;

const url = "/products";
export const loadProducts = (params) => (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: productFetchBegan.type,
      params,
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


export const setCurrentCategory = (categoryId) => dispatch => {
  dispatch(currentCategoryIdSet({categoryId}))
}


export const clearSearch = () => dispatch => {
  dispatch(searchCleared())
}