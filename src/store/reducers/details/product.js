import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    data: {},
  },
  reducers: {
    productFetchStarted: (product, action) => {
      product.loading = true;
    },
    productFetchEnded: (product, action) => {
      product.loading = false;
    },
    productFetched: (product, action) => {
      product.data = action.payload.data;
    },
  },
});
