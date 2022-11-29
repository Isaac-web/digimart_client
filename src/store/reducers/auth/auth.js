import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../actions/api";
import jwtDecode from "jwt-decode";
import storage from "../../../utils/storage";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    data: {},
    token: null,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      storage.setItem("token", action.payload.data);
      state.data = jwtDecode(action.payload.data);
      state.token = action.payload.data;
    },
    userLoginBegan: (state) => {
      state.loading = true;
    },
    userLoginEnded: (state) => {
      state.loading = false;
    },
    userLoggedOut: (state) => {
      localStorage.removeItem("token");
      state.data = {};
      state.token = null;
    },
  },
});

export default slice.reducer;
const { userLoggedIn, userLoginBegan, userLoginEnded, userLoggedOut } =
  slice.actions;

const url = "/users";
export const login = (data, callback) => async (dispatch) => {
  await dispatch(
    apiRequest({
      url: `${url}/login`,
      data,
      method: "post",
      onSuccess: userLoggedIn.type,
      onBegin: userLoginBegan.type,
      onEnd: userLoginEnded.type,
      toggleOnError: true,
    })
  );

  if (callback) callback();
};

export const logout = (callback) => (dispatch) => {
  dispatch(userLoggedOut);
  localStorage.clear();
  if (callback) callback();
};
