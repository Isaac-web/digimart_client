import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const customers = [];

const slice = createSlice({
  name: "customers",
  initialState: {
    loading: false,
    search: {
      active: false,
      loading: false,
      data: {
        count: 0,
        items: [],
      },
    },
    data: {
      count: 0,
      items: [],
    },
  },
  reducers: {
    customersFetchBegan: (customers) => {
      customers.loading = true;
    },
    customersFetchEnded: (customers) => {
      customers.loading = false;
    },
    customersFetched: (customers, action) => {
      customers.data.items = action.payload.data.customers;
      customers.data.count = action.payload.data.count;
    },
    customersSearchBegan: (customers) => {
      customers.search.loading = true;
    },
    customersSearchEnded: (customers) => {
      customers.search.loading = false;
    },
    customersSearched: (customers, action) => {
      customers.search.active = true;
      customers.search.data.items = action.payload.data.customers;
      customers.search.data.count = action.payload.data.count;
    },
    customersSearchedCleared: (customers, action) => {
      customers.search.data.items = [];
      customers.search.data.count = 0;
      customers.search.active = false;
    },
  },
});

export default slice.reducer;
const {
  customersFetchBegan,
  customersFetchEnded,
  customersFetched,
  customersSearchBegan,
  customersSearchEnded,
  customersSearched,
  customersSearchedCleared,
} = slice.actions;

const url = "/customers";
export const fetchCustomers = () => async (dispatch) => {
  dispatch(
    apiRequest({
      url,
      onBegin: customersFetchBegan.type,
      onEnd: customersFetchEnded.type,
      onSuccess: customersFetched.type,
      toggleOnError: true,
    })
  );
};

export const searchCustomers = (params) => (dispatch) => {
  dispatch(
    apiRequest({
      url,
      params,
      onBegin: customersSearchBegan.type,
      onEnd: customersSearchEnded.type,
      onSuccess: customersSearched.type,
      toggleOnError: true,
    })
  );
};

export const clearCustomerSearch = () => (dispatch) => {
  dispatch(customersSearchedCleared());
};
