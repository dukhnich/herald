import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {loadUser} from "../../services/userData";
import {loadChats} from "../../services/ownersChats";
import {socket} from "../../API";
import {getNotifications} from "../../services/notifications";

const ProtectedRoute = ({ children, redirectTo, dispatch, currentChat, currentUserChats, currentUser, isAuth, ...rest }) => {
    const loadData = () => {
        if (rest.computedMatch.path !== "/chats/:id" && Object.keys(currentChat).length) {
            dispatch({ type: "loadChat/quit" });
        }
        if (!currentUser.login) {
            dispatch(loadUser(currentUser._id));
        }
        if (currentUserChats.length === 0) {
            dispatch(loadChats(currentUser._id));
        }
        socket.on('msg', msg => dispatch(getNotifications(msg)));
    }

    React.useEffect(() => {
           loadData()
        },
        [])
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: redirectTo,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
ProtectedRoute.defaultProps = {
    redirectTo: "/login"
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentChat: state.currentChat.currentChat,
    currentUserChats: state.chats.currentUserChats,
    isAuth: (state.auth.isAuth),
});

export default connect(mapStateToProps)(ProtectedRoute);
