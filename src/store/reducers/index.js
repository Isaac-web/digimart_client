import { combineReducers } from "redux";
import entities from "./entities/index";
import details from "./details/index";

const reducers = combineReducers({ entities, details });

export default reducers;
