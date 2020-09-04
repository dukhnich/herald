import { gql } from "graphql-request";

const loginQuery = gql`
  query auth($login: String!, $password: String!) {
    login(login: $login, password: $password)
  }
`;

export const login = (values) => async (dispatch, _, api) => {
    try {
        dispatch({ type: "login/pending" });
        const { login } = await api.request(loginQuery, values);

        console.log("login", login);
        if (login === null) {
            dispatch({ type: "login/rejected" });
        }
        localStorage.setItem("token", login);
        api.setHeader("Authorization", `Bearer ${login}`);
        dispatch({ type: "login/resolved" });
    } catch (error) {
        dispatch({ type: "login/rejected" });
    }
};
