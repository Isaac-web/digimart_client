import { combineReducers } from "redux";
import entities from "./entities/index";
import details from "./details/index";
import snackbar from "./utils/snackbar";

const reducers = combineReducers({ entities, details, snackbar });

export default reducers;
