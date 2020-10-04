const initialState = {
    currentChat: {},
    status: "idle"
};

const loadChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case "loadChat/pending":
            return {
                ...state,
                status: "pending"
            };
        case "loadChat/load/resolved":
            return {
                ...state,
                currentChat: action.payload,
                status: "resolved"
            };
        case "loadChat/quit":
            return {
                ...state,
                currentChat: {},
                status: "idle"
            };
        case "loadChat/rejected":
            return {
                ...state,
                status: "rejected",
            };
        default:
            return state;
    }
};

export default loadChatReducer;
