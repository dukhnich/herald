import { combineReducers } from "redux";
import { authReducer } from "./../services/login";
import {loadUserReducer} from "../services/userData";

export default combineReducers({ auth: authReducer, currentUser: loadUserReducer });