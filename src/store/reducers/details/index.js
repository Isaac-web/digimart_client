import { combineReducers } from "redux";

import category from "./category";
import product from "./product"
import branch from "./branch";
import order from "./order";
import recipe from "./recipe";
const details = combineReducers({ branch, category, order, product, recipe });

export default details;
