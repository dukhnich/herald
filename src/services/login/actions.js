import { gql } from "graphql-request";
import {decode} from "../../shared/helpers/decode";
import {socket} from "../../API";

const loginQuery = gql`
  query auth($login: String!, $password: String!) {
    login(login: $login, password: $password)
  }
`;

export const login = (values) => async (dispatch, _, api) => {
    try {
        // console.log(values);

        dispatch({ type: "login/pending" });
        const { login } = await api.request(loginQuery, values);

        // console.log("login", login);
        if (login === null) {
            dispatch({ type: "login/rejected" });
        }
        localStorage.setItem("token", login);
        api.setHeader("Authorization", `Bearer ${login}`);
        const user = decode(login).payload.sub;
        dispatch({ type: "loadUser/resolved", payload: {_id: user.id} })
        socket.emit('jwt', login);
        socket.on('jwt_ok',   data => console.log(data))
        socket.on('jwt_fail', error => console.log(error))
        socket.on('msg', msg => console.log(msg));
        dispatch({ type: "login/resolved" })
    } catch (error) {
        dispatch({ type: "login/rejected" });
    }
};

export const logout = () => async (dispatch,_,api) => {
   localStorage.removeItem("token");
   // api.removeHeader("Authorization");
   dispatch({ type: "logout"})
};