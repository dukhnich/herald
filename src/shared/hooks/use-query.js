import React from "react";
import API from "./../../API";

function reducer(state, action) {
    switch (action.type) {
        case "pending":
            return {
                ...state,
                status: "pending"
            };
        case "resolved":
            return { ...state, data: action.payload, status: "resolved" };
        case "rejected":
            return { ...state, status: "rejected", error: action.error };
        default:
            throw new Error();
    }
}

const useQuery = ({ query, variables = {}, initialState }) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        initialState,
        (initialData) => ({
            error: null,
            status: "idle",
            data: initialData
        })
    );

    React.useEffect(() => {
        dispatch({ type: "pending" });
        API.request(query, variables)
            .then((data) => {
                dispatch({ type: "resolved", payload: data });
            })
            .catch((error) => {
                console.log("e", error);
                dispatch({ type: "rejected", error: error });
            });
    }, []);

    return state;
};

export default useQuery;
