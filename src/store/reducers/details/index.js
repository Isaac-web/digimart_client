import { combineReducers } from "redux";

import category from "./category";
import product from "./product"
import branch from "./branch";
import order from "./order";
const details = combineReducers({ branch, category, order, product });

export default details;
