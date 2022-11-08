import { combineReducers } from "redux";
import employees from "./employees";

const entities = combineReducers({ employees });

export default entities;
