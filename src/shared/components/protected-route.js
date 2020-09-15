import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import {loadUser} from "../../services/userData";

const ProtectedRoute = ({ children, redirectTo, dispatch, currentUser, isAuth, ...rest }) => {
    // console.log("isAuth", isAuth, currentUser);
    React.useEffect(() => {
            if (!currentUser.login) {
                dispatch(loadUser(currentUser._id));
            }
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
    isAuth: (state.auth.isAuth),
});

export default connect(mapStateToProps)(ProtectedRoute);
