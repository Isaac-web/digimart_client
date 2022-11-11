import { combineReducers } from "redux";
import employees from "./employees";
import customers from "./customers";
import orders from "./orders";
import products from "./products";
import categories from "./categories";

const entities = combineReducers({
  categories,
  customers,
  employees,
  orders,
  products,
});

export default entities;
