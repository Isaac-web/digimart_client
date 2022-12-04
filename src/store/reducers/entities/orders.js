import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    pendingCount: 0,
    data: [],
  },
  reducers: {
    orderFetched: (orders, action) => {
      orders.data = action.payload.data;
    },
    orderFetchStarted: (orders) => {
      orders.loading = true;
    },
    orderFetchEnded: (orders) => {
      orders.loading = false;
    },
    pendingOrdersFetched: (orders, action) => {
      const diff = action.payload.data - orders.data.length ;
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

export const fetchBranchOrders = () => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/branch`,
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