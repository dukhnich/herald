const initialState = {
    currentChat: {},
    goTo: null,
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
                goTo: null,
                status: "resolved"
            };
        case "loadChat/goTo":
            return {
                ...state,
                goTo: action.payload,
            };
        case "loadChat/quit":
            return {
                ...state,
                currentChat: {},
                goTo: null,
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
