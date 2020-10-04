const initialState = {
    chats: [],
    status: "idle",
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "notifications/pending":
            return {
                ...state,
                status: "pending"
            };
        case "notifications/add/resolved":
            const chats = [...state.chats]
            const isNewChat = chats.reduce((prev, current) => {
                    if (current._id === action.payload.chat._id) {
                        const isNewMessage = current.notifications.reduce((prev, msg) =>
                                msg._id === action.payload._id ? false : prev
                            , true)
                        isNewMessage && current.notifications.push(action.payload);
                        return false
                    }
                    return prev
                }
                , true)
            if (isNewChat) chats.push(
                {
                    _id: action.payload.chat._id,
                    title: action.payload.chat.title,
                    notifications: [action.payload]
                }
            )
            console.log("chats", chats)

            return {
                ...state,
                chats: chats,
                status: "resolved"
            };
        case "notifications/remove/resolved":
            return {
                ...state,
                chats:
                    state.chats.filter(chat => chat._id !== action.payload),
                status: "resolved"
            };
        case "notifications/rejected":
            return {
                ...state,
                status: "rejected",
            };
        default:
            return state;
    }
};

export default notificationsReducer;
