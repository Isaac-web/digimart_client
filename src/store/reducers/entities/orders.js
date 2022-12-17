import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    pendingCount: 0,
    data: {
      items: [],
      totalItemsCount: 0,
      currentPage: 0,
      pageSize: 10,
    },
  },
  reducers: {
    orderFetched: (orders, action) => {
      orders.data.items = action.payload.data.orders;
      orders.data.totalItemsCount = parseInt(action.payload.data.ordersCount);
      orders.data.currentPage = parseInt(action.payload.data.currentPage);
    },
    orderFetchStarted: (orders) => {
      orders.loading = true;
    },
    orderFetchEnded: (orders) => {
      orders.loading = false;
    },
    pendingOrdersFetched: (orders, action) => {
      orders.pendingCount = action.payload.data;
    },
  },
});

export default slice.reducer;
const {
  orderFetched,
  orderFetchStarted,
  orderFetchEnded,
  pendingOrdersFetched,
} = slice.actions;

const url = "/orders";
export const fetchOrders = (params) => (dispatch) => {
  dispatch(
    apiRequest({
      url,
      params,
      onSuccess: orderFetched.type,
      toggleOnError: true,
      onBegin: orderFetchStarted.type,
      onEnd: orderFetchEnded.type,
    })
  );
};

export const fetchBranchOrders = (params) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/branch`,
      params,
      onSuccess: orderFetched.type,
      toggleOnError: true,
      onBegin: orderFetchStarted.type,
      onEnd: orderFetchEnded.type,
    })
  );
};

export const fetchPendingOrders = (data) => (dispatch) => {
  dispatch(pendingOrdersFetched({ data: data.pendingOrders }));
};


const changePageSize = (pageSize) => {
  
}