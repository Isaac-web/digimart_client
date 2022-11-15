import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";

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
    posting: false,
    data: [],
  },
  reducers: {
    employeesLoadBegan: (employees) => {
      employees.loading = true;
    },
    employeesLoadEnded: (employees) => {
      employees.loading = false;
    },
    employeesLoaded: (employees, action) => {
      employees.data = action.payload;
    },
    employeeAddBegan: (employees) => {
      employees.posting = true;
    },
    employeeAddEnded: (employees) => {
      employees.posting = false;
    },
    employeeAdded: (employees, action) => {
      employees.data.push(action.payload.data);
    },
  },
});

export default slice.reducer;
const {
  employeesLoaded,
  employeesLoadBegan,
  employeesLoadEnded,
  employeeAddBegan,
  employeeAddEnded,
  employeeAdded,
} = slice.actions;

export const loadEmployees = () => async (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: employeesLoadBegan.type,
      onEnd: employeesLoadEnded.type,
      onSuccess: employeesLoaded.type,
      url: "/employees",
    })
  );
};

export const createEmployee = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      data,
      onSuccess: employeeAdded.type,
      onBegin: employeeAddBegan.type,
      onEnd: employeeAddEnded.type,
      method: "post",
      url: "/employees/new",
    })
  );

  if (callback) callback();
};
