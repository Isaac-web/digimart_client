import { combineReducers } from "redux";
import entities from "./entities/index";
import details from "./details/index";
import snackbar from "./utils/snackbar";
import auth from "./auth/auth";

const reducers = combineReducers({ auth, entities, details, snackbar });

export default reducers;
