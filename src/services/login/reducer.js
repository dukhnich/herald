const initialState = {
    isLoggedIn: !!localStorage.getItem("token"),
    status: "idle"
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "login/pending":
            return {
                ...state,
                status: "pending"
            };
        case "login/resolved":
            return {
                ...state,
                isLoggedIn: true,
                status: "resolved"
            };
        case "login/rejected":
            return {
                ...state,
                status: "rejected",
                isLoggedIn: false
            };
        default:
            return state;
    }
};

export default authReducer;
