import React from "react";
import Avatar from "../../shared/components/Avatar/Avatar";
import {connect} from "react-redux";
import {logout} from "../../services/login";
import {loadUser} from "../../services/userData";

const MenuFooter = ({currentUser, dispatch}) => {
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    React.useEffect(() => {
            if (!currentUser.login) {
                dispatch(loadUser(currentUser._id));
            }
        },
        [])

    return (
        <div className={"black-footer d-flex justify-content-between"}>
            <div className={"d-flex flex-column justify-content-center ml-4"}>
                <button className={"custom-button medium-header"} onClick={onLogout}>Logout</button>
                <h6 className={"rose-text upper-header"}>{currentUser.login}</h6>
            </div>
            <Avatar user={currentUser} />
        </div>
    )
}

const mapStateToProps = (state) => ({

    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(MenuFooter);