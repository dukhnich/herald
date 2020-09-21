import {decode} from "../../shared/helpers/decode";

const token = localStorage.getItem("token");
const user = token ? decode(token).payload.sub : {};
console.log(user)
const initialState = {
    currentUserChats: [],
    status: "idle",
};

const loadOwnersChatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "loadChats/pending":
            return {
                ...state,
                status: "pending"
            };
        case "loadChats/resolved":
            return {
                ...state,
                currentUserChats: action.payload,
                status: "resolved"
            };
        case "loadChats/rejected":
            return {
                ...state,
                status: "rejected",
            };
        default:
            return state;
    }
};

export default loadOwnersChatsReducer;
