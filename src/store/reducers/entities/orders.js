import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    pendingCount: 0,
    search: {
      active: false,
      data: {
        items: [],
      },
    },
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
    orderDeleted: (orders, action) => {
      orders.data.items = orders.data.items.filter(
        (item) => item._id !== action.payload.id
      );
    },
    pendingOrdersFetched: (orders, action) => {
      orders.pendingCount = action.payload.data;
    },
    orderSearchBegan: (orders) => {
      orders.search.searching = true;
    },
    searchResultFetched: (orders, action) => {
      orders.search.active = true;
      orders.search.data.items = action.payload.data.orders;
    },
    orderSearchEnded: (orders) => {
      orders.search.searching = false;
    },
    orderSearchCleared: (orders) => {
      orders.search.searching = false;
      orders.search.data.items = [];
      orders.search.active = false;
    },
  },
});

export default slice.reducer;
const {
  orderFetched,
  orderFetchStarted,
  orderFetchEnded,
  pendingOrdersFetched,
  searchResultFetched,
  orderSearchBegan,
  orderSearchEnded,
  orderSearchCleared,
  orderDeleted,
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

export const searchOrders = (params) => async (dispatch) => {
  dispatch(
    apiRequest({
      url,
      params,
      onBegin: orderSearchBegan.type,
      onEnd: orderSearchEnded.type,
      onSuccess: searchResultFetched.type,
    })
  );
};

export const clearOrderSearch = () => (dispatch) => {
  dispatch(orderSearchCleared());
};

export const deleteOrder = (orderId) => (dispatch) => {
  dispatch(orderDeleted({ id: orderId }));
  dispatch(
    apiRequest({
      url: `${url}/${orderId}`,
      method: "delete",
      toggleOnError: true,
      toggleOnSuccess: true,
    })
  );
};