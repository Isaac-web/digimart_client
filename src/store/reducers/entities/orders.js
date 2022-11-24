import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    orderFetched: (orders, action) => {
      orders.data = action.payload.data;
    },
    orderFetchStarted: (orders, action) => {
      orders.loading = true;
    },
    orderFetchEnded: (orders, action) => {
      orders.loading = false;
    },
  },
});

export default slice.reducer;
const { orderFetched, orderFetchStarted, orderFetchEnded } = slice.actions;

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
