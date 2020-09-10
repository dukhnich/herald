import {decode} from "../../shared/helpers/decode";

const token = localStorage.getItem("token");
const user = token ? decode(token).payload.sub : {};
console.log(user)
const initialState = {
    currentUser: {_id: user.id},
    status: "idle",
};

const loadUserReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case "loadUser/pending":
            return {
                ...state,
                status: "pending"
            };
        case "loadUser/resolved":
            return {
                ...state,
                currentUser: action.payload,
                status: "resolved"
            };
        case "loadUser/rejected":
            return {
                ...state,
                status: "rejected",
            };
        default:
            return state;
    }
};

export default loadUserReducer;
