const initialState = {
    currentMessages: [],
    status: "idle"
};

const newMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "newMessage/pending":
            return {
                ...state,
                status: "pending"
            };
        case "newMessage/changeInfo":
            let isNew = true;
            const changedMessages = state.currentMessages.map((msg) => {
                if (msg.chat._id === action.payload.chat._id) {
                    isNew = false;
                    return {
                        ...msg,
                        ...action.payload
                    }
                }
                return msg
            })
            isNew && changedMessages.push(action.payload);
            return {
                ...state,
                currentMessages: changedMessages,
            };
        case "newMessage/send/resolved":
            const messagesAfterRemove = state.currentMessages.filter(
                msg => msg.chat._id !== action.payload.chat._id)
            return {
                ...state,
                currentMessages: messagesAfterRemove,
                status: "resolved"
            };
        case "newMessage/rejected":
            return {
                ...state,
                status: "rejected",
            };
        default:
            return state;
    }
};

export default newMessageReducer;
