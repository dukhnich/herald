import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {loadUser} from "../../services/userData";
import {loadChats} from "../../services/ownersChats";
import {socket} from "../../API";
import {getNotifications} from "../../services/notifications";

const ProtectedRoute = ({ children, redirectTo, dispatch, currentUserChats, currentUser, isAuth, ...rest }) => {
    React.useEffect(() => {
            if (!currentUser.login) {
                dispatch(loadUser(currentUser._id));
            }
            if (currentUserChats.length === 0) {
                dispatch(loadChats(currentUser._id));
            }
            socket.on('msg', msg => dispatch(getNotifications(msg)));
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
    currentUserChats: state.chats.currentUserChats,
    isAuth: (state.auth.isAuth),
});

export default connect(mapStateToProps)(ProtectedRoute);
