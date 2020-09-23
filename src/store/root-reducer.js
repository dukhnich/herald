import { combineReducers } from "redux";
import { authReducer } from "./../services/login";
import {loadUserReducer} from "../services/userData";
import {loadOwnersChatsReducer} from "../services/ownersChats";
import {notificationsReducer} from "../services/notifications";

export default combineReducers(
{
            auth: authReducer,
            currentUser: loadUserReducer,
            chats: loadOwnersChatsReducer,
            notifications: notificationsReducer
        }
);