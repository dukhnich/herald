import React from "react";
import Avatar from "../../shared/components/Avatar/Avatar";
import {connect} from "react-redux";
import {logout} from "../../services/login";

const MenuFooter = ({currentUser, dispatch}) => {
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className={"black-footer d-flex justify-content-between"}>
                <div className={"d-flex flex-column justify-content-center ml-4"}>
                    <button className={"custom-button medium-header text-left"} onClick={onLogout}>Logout</button>
                    <h6 className={"rose-text upper-header"}>{currentUser.login}</h6>
                </div>
                <Avatar data={currentUser} />
        </div>
    )
}

const mapStateToProps = (state) => ({

    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(MenuFooter);