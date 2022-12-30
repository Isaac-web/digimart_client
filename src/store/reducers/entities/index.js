import { combineReducers } from "redux";
import employees from "./employees";
import customers from "./customers";
import orders from "./orders";
import products from "./products";
import categories from "./categories";
import branches from "./branches";
import designations from "./designations";
import recipeCategories from "./recipeCategories";
import recipes from "./recipes";
import coupons from "./coupons";

const entities = combineReducers({
  categories,
  customers,
  employees,
  orders,
  products,
  branches,
  designations,
  recipeCategories,
  recipes,
  coupons,
});

export default entities;
