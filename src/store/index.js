import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import reducer from "./reducers/index";
import apiMiddleware from "./middleware/api";

const configureReduxStore = () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), apiMiddleware],
  });
};

export default configureReduxStore;
