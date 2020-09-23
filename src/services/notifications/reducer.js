const initialState = {
    notifications: [],
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
            return {
                ...state,
                notifications:
                    [...state.notifications, action.payload],
                status: "resolved"
            };
        case "notifications/remove/resolved":
            return {
                ...state,
                notifications:
                    state.notifications.filter(note => {
                        const isInRemovedArr = !!(action.payload.filter(msg => msg._id === note._id).length);
                        return !isInRemovedArr
                    }),
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
