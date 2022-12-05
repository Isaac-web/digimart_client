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
      orders.data.totalItemsCount = action.payload.data.ordersCount;
      orders.data.currentPage = action.payload.data.currentPage;
    },
    orderFetchStarted: (orders) => {
      orders.loading = true;
    },
    orderFetchEnded: (orders) => {
      orders.loading = false;
    },
    pendingOrdersFetched: (orders, action) => {
      const diff = action.payload.data.items - orders.data.orders.length;
      orders.pendingCount = diff;
    },
  },
});

export default slice.reducer;
const {
  orderFetched,
  orderFetchStarted,
  orderFetchEnded,
  orderAppended,
  pendingOrdersFetched,
} = slice.actions;

const url = "/orders";
export const fetchOrders = () => (dispatch) => {
  dispatch(
    apiRequest({
      url,
      onSuccess: orderFetched.type,
      toggleOnError: true,
      onBegin: orderFetchStarted.type,
      onEnd: orderFetchEnded.type,
    })
  );
};

export const fetchBranchOrders = (options) => (dispatch) => {
  const { pageSize, currentPage } = options || {};
  console.log(currentPage);

  dispatch(
    apiRequest({
      url: `${url}/branch?pageSize=${pageSize || 10}&currentPage=${
        currentPage || 0
      }`,
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






export const appendOrder = (order) => dispatch => {
  dispatch(orderAppended({data: order}))
};