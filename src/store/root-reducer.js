import { combineReducers } from "redux";
import { authReducer } from "./../services/login";

export default combineReducers({ auth: authReducer });