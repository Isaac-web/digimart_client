import { createSlice } from "@reduxjs/toolkit";

const customers = [
  {
    _id: "1",
    name: "John Doe",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
  {
    _id: "2",
    name: "Andy Mat",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
  {
    _id: "3",
    name: "Henry Kwame",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
  {
    _id: "4",
    name: "Isaac Taiy",
    phone: "555-555-5555",
    email: "johnexample@gmail.com",
    status: 3,
    numberOfOrders: 24,
  },
];

const slice = createSlice({
  name: "customers",
  initialState: {
    loading: true,
    data: [...customers],
  },
  reducers: {
    customersFetched: (customers, action) => {
      customers = action.payload;
    },
  },
});

export default slice.reducer;
