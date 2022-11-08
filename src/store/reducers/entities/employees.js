import { createSlice } from "@reduxjs/toolkit";

const employees = [
  {
    _id: "1",
    image: "",
    name: "Employee 1",
    salary: "Ghc 2000",
    designation: "Rider",
    lastSeen: "Just Now",
  },
  {
    _id: "2",
    image: "",
    name: "Employee 2",
    salary: "Ghc 5000",
    designation: "Manager",
    lastSeen: "Online",
  },
  {
    _id: "3",
    image: "",
    name: "Employee 3",
    salary: "Ghc 2000",
    designation: "Rider",
    lastSeen: "Just Now",
  },
  {
    _id: "4",
    image: "",
    name: "Employee 1",
    salary: "Ghc 2300",
    designation: "Sales Person",
    lastSeen: "Online",
  },
];

const slice = createSlice({
  name: "employees",
  initialState: {
    loading: false,
    data: [...employees],
  },
  reducers: {
    employeesLoaded: (employees, action) => {
      employees = action.payload;
    },
  },
});

export default slice.reducer;
