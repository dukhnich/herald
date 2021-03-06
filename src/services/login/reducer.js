const initialState = {
    isAuth: !!localStorage.getItem("token"),
    status: "idle",
};

const authReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case "login/pending":
            return {
                ...state,
                status: "pending"
            };
        case "login/resolved":
            return {
                ...state,
                isAuth: true,
                status: "resolved"
            };
        case "login/rejected":
            return {
                ...state,
                status: "rejected",
                isAuth: false
            };

        case "logout":
            return {
                ...state,
                isAuth: false,
                status: "resolved"
            };

        default:
            return state;
    }
};

export default authReducer;
