import { combineReducers } from "redux";

import category from "./category";
import product from "./product"

const details = combineReducers({ category, product });

export default details;
