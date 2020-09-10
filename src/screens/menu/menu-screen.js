import React from "react";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../shared/components/Spinner";
import { logout } from "../../services/login";


const Menu = ({ dispatch, authStatus, isLoggedIn}) => {
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <>
            <div className={"black-shadow"}>
                <div className={"container-small"}>
                    <button onClick={onLogout}>Logout</button>
                </div>
            </div>

        </>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: (state.auth.isAuth),
    authStatus: state.auth.status,
});
export default connect(mapStateToProps)(Menu);
