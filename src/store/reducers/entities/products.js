import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    data: [],
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
  },
});
export default slice.reducer;
const {
  productsFetched,
  productFetchBegan,
  productFetchEnded,
  productAdded,
  productRemoved,
} = slice.actions;

const url = "/products";
export const loadProducts = (data) => (dispatch) => {
  dispatch(productsFetched({ data }));

  dispatch(
    apiRequest({
      onStart: productFetchBegan.type,
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
    })
  );

  if (callback) callback();
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(productRemoved({ _id: id }));

  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      method: "delete",
    })
  );
};
