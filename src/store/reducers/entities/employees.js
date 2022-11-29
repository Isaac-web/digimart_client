import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";


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

const url = "/users";
export const loadEmployees = () => async (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: employeesLoadBegan.type,
      onEnd: employeesLoadEnded.type,
      onSuccess: employeesLoaded.type,
      url: `${url}?userType=employee`,
    })
  );
};

export const createEmployee = (data, options, callback) => async (dispatch) => {
  console.log(data);
  await dispatch(
    apiRequest({
      data,
      onSuccess: employeeAdded.type,
      onBegin: employeeAddBegan.type,
      onEnd: employeeAddEnded.type,
      method: "post",
      url: `${url}/signup?userType${options.userType}`,
      toggleOnError: "true",
      toggleOnSuccess: "true",
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
      toggleOnError: "true",
      toggleOnSuccess: "true",
    })
  );
};
