import { createSlice } from "@reduxjs/toolkit";

const items = [
  {
    id: "1",
    orderId: "111222333444",
    date: "1 Jul 2022",
    deliveryDate: "3 Jul 2022",
    itemsCount: "12",
    status: 0,
    total: 150,
  },
  {
    id: "2",
    orderId: "111222333444",
    date: "1 Jul 2022",
    deliveryDate: "3 Jul 2022",
    itemsCount: "12",
    status: 0,
    total: 150,
  },
  {
    id: "3",
    orderId: "111222333444",
    date: "1 Jul 2022",
    deliveryDate: "3 Jul 2022",
    itemsCount: "12",
    status: 0,
    total: 150,
  },
  {
    id: "4",
    orderId: "111222333444",
    date: "1 Jul 2022",
    deliveryDate: "3 Jul 2022",
    itemsCount: "12",
    status: 0,
    total: 150,
  },
];

const slice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    data: [...items],
  },
  reducers: {
    orderFetched: (orders, action) => {
      orders = action.payload;
    },
  },
});

export default slice.reducer;
