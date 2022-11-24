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
    employeeRemoved: (employees, action) => {
      employees.data = employees.data.filter(
        (e) => e._id !== action.payload.data._id
      );
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
  employeeRemoved,
} = slice.actions;

const url = "/employees";
export const loadEmployees = () => async (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: employeesLoadBegan.type,
      onEnd: employeesLoadEnded.type,
      onSuccess: employeesLoaded.type,
      url,
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
      url: `${url}/new`,
    })
  );

  if (callback) callback();
};

export const deleteEmployee = (id) => (dispatch) => {
  dispatch(
    apiRequest({
      url: `${url}/${id}`,
      method: "delete",
      onSuccess: employeeRemoved.type,
    })
  );
};
