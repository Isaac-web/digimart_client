import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";


const slice = createSlice({
  name: "employees",
  initialState: {
    loading: false,
    posting: false,
    search: {
      loading: false,
      active: false,
      data: { items: [], count: 0, currentPage: 0, pageSize: null },
    },
    data: { items: [], count: 0, currentPage: 0, pageSize: null },
  },
  reducers: {
    employeesLoadBegan: (employees) => {
      employees.loading = true;
    },
    employeesLoadEnded: (employees) => {
      employees.loading = false;
    },
    employeesLoaded: (employees, action) => {
      employees.data.items = action.payload.data.users;
      employees.data.count = action.payload.data.count;
      employees.data.currentPage = action.payload.data.currentPage;
      employees.data.pageSize = action.payload.data.pageSize;
    },
    employeesSearched: (employees, action) => {
      employees.search.active = true;
      employees.search.data.items = action.payload.data.users;
      employees.search.data.count = action.payload.data.count;
      employees.search.data.currentPage = action.payload.data.currentPage;
      employees.search.data.pageSize = action.payload.data.pageSize;
    },
    employeeSearchBegan: (employees) => {
      employees.search.loading = true;
    },
    employeeSearchCleared: (employees) => {
      employees.search.active = false;
      employees.search.data.items = [];
    },
    employeeSearchEnded: (employees) => {
      employees.search.loading = false;
    },
    employeeAddBegan: (employees) => {
      employees.posting = true;
    },
    employeeAddEnded: (employees) => {
      employees.posting = false;
    },
    employeeAdded: (employees, action) => {
      employees.data.items.push(action.payload.data);
    },
    employeeRemoved: (employees, action) => {
      employees.data.items = employees.data.items.filter(
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
  employeesSearched,
  employeeSearchBegan,
  employeeSearchEnded,
  employeeSearchCleared,
} = slice.actions;

const url = "/users";
export const loadEmployees = (params) => async (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: employeesLoadBegan.type,
      params,
      onEnd: employeesLoadEnded.type,
      onSuccess: employeesLoaded.type,
      url: `${url}?userType=employee`,
    })
  );
};

export const searchEmployees = (params) => async (dispatch) => {
  dispatch(
    apiRequest({
      onBegin: employeeSearchBegan.type,
      params,
      onEnd: employeeSearchEnded.type,
      onSuccess: employeesSearched.type,
      url: `${url}?userType=employee`,
    })
  );
};

export const clearSearch = () => async (dispatch) => {
  dispatch(employeeSearchCleared());
};

export const createEmployee = (data, options, callback) => async (dispatch) => {
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



