import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    data: {
      _id: "",
      orderId: "",
    },
  },
  reducers: {
    orderFetched: (order, action) => {
      order.data = action.payload;
    },
  },
});
