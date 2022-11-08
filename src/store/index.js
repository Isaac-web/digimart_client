import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import reducer from "./reducers/index";

const configureReduxStore = () => {
  return configureStore({ reducer });
};

export default configureReduxStore;
