import { combineReducers } from "redux";

import category from "./category";
import product from "./product"
import branch from "./branch";
import order from "./order";
import recipe from "./recipe";
import slide from "./slide";
const details = combineReducers({
  branch,
  category,
  order,
  product,
  recipe,
  slide,
});

export default details;
