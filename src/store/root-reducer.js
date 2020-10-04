import { combineReducers } from "redux";
import { authReducer } from "./../services/login";
import {loadUserReducer} from "../services/userData";
import {loadOwnersChatsReducer} from "../services/ownersChats";
import {notificationsReducer} from "../services/notifications";
import {loadChatReducer} from "../services/currentChat";
import {newMessageReducer} from "../services/currentMessages";

export default combineReducers(
{
            auth: authReducer,
            currentUser: loadUserReducer,
            currentChat: loadChatReducer,
            chats: loadOwnersChatsReducer,
            notifications: notificationsReducer,
            currentMessages: newMessageReducer
        }
);