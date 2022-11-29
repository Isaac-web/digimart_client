import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    data: {},
  },
  reducers: {
    productFetchStarted: (product) => {
      product.loading = true;
    },
    productFetchEnded: (product) => {
      product.loading = false;
    },
    productFetched: (product, action) => {
      product.data = action.payload.data;
    },
    productUpdated: (product, action) => {
      product.data = action.payload.data;
    },
  },
});

export default slice.reducer;
const {
  productFetched,
  productFetchEnded,
  productFetchStarted,
  productUpdated,
} = slice.actions;

const url = "/products";
export const fetchProduct = (id) => async (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: productFetchStarted.type,
      onEnd: productFetchEnded.type,
      onSuccess: productFetched.type,
      url: `${url}/${id}`,
    })
  );
};

export const updateProduct = (id, data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url: `/products/${id}`,
      data,
      method: "patch",
      onSuccess: productUpdated.type,
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );

  if (callback) callback();
};