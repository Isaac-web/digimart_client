import { combineReducers } from "redux";
import employees from "./employees";
import customers from "./customers";
import orders from "./orders";
import products from "./products";
import categories from "./categories";
import branches from "./branches";
import designations from "./designations";
import riders from "./riders";

const entities = combineReducers({
  categories,
  customers,
  employees,
  orders,
  products,
  branches,
  designations,
  riders,
});

export default entities;
