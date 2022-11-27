import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

const slice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    updating: false,
    updatingStatus: false,
    data: {
      order_items: [],
    },
    clearedItems: [],
  },
  reducers: {
    orderFetched: (order, action) => {
      order.data = action.payload.data;
    },
    orderFetchBegan: (order) => {
      order.loading = true;
    },
    orderFetchEnded: (order) => {
      order.loading = false;
    },
    orderItemCleared: (order, action) => {
      const index = order.data.order_items?.findIndex(
        (item) => action.payload._id
      );

      order.clearedItems.push(order.data.order_items[index]);
      order.data.order_items.splice(index, 1);
    },
    orderItemUncleared: (order, action) => {
      const index = order.clearedItems.findIndex(
        (item) => item.product === action.payload.product
      );
      order.data.order_items.unshift(order.clearedItems[index]);
      order.clearedItems.splice(index, 1);
    },
    riderSet: (order, action) => {
      order.data.rider = action.payload;
    },
    orderDispatchBegan: (order) => {
      order.updating = true;
    },
    orderDispatchEnded: (order) => {
      order.updating = false;
    },
    orderOpened: (order, action) => {
      order.data.status = action.payload.data;
      console.log(order.data.status);
    },
    orderOpenBegan: (order) => {
      order.updatingStatus = true;
    },
    orderOpenEnded: (order) => {
      order.updatingStatus = false;
    },
  },
});

export default slice.reducer;
const {
  orderFetched,
  orderFetchBegan,
  orderFetchEnded,
  orderItemCleared,
  orderItemUncleared,
  riderSet,
  orderDispatchBegan,
  orderDispatchEnded,
  orderOpened,
  orderOpenBegan,
  orderOpenEnded,
} = slice.actions;

const url = "/orders";
export const fetchOrder = (id) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      onSuccess: orderFetched.type,
      onBegin: orderFetchBegan.type,
      onEnd: orderFetchEnded.type,
    })
  );
};

export const clearOrderItem = (product) => (dispatch) => {
  dispatch(orderItemCleared(product));
};

export const unclearOrderItem = (product) => (dispatch) => {
  dispatch(orderItemUncleared(product));
};

export const setRider = (rider) => (dispatch) => {
  dispatch(riderSet(rider));
};

export const dispatchOrder = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url: `${url}/${data.orderId}/dispatch`,
      method: "patch",
      data: { riderId: data.riderId },
      onBegin: orderDispatchBegan.type,
      onEnd: orderDispatchEnded.type,
      toggleOnSuccess: true,
      toggleOnError: true,
    })
  );

  if (callback) callback();
};

export const updateOnOpen = (id) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}/opened`,
      method: "patch",
      toggleOnError: true,
      onSuccess: orderOpened.type,
      onBegin: orderOpenBegan.type,
      onEnd: orderOpenEnded.type,
    })
  );
};




