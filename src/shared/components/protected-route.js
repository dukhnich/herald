import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo, currentUser, isAuth, ...rest }) => {
    console.log("isAuth", isAuth, rest);
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
    isAuth: (state.auth.isAuth),
});

export default connect(mapStateToProps)(ProtectedRoute);
