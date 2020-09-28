import React from "react";
import {Link} from "react-router-dom";
import "./navigation.css"
import {string, bool} from "prop-types";
import {connect} from "react-redux";
import NotificationButton from "./NotificationButton";

const NavBar = ({text, isLoggedIn, isAdditionalButton, children}) => {
    return (
        <nav className="navbar navigation-bar px-0">
            <div className={"container"}>
            <ul className="navbar-nav w-100 m-0 flex-row align-items-center row">
                <li className="col-3">
                    <Link
                        className="nav-link"
                        to={isLoggedIn ? "/menu" : "/login"}
                    >
                        {isLoggedIn ?
                            <div className={"menu__btn"}>
                                <span/>
                            </div>
                            : <div className={"triangle triangle-left"}/>
                        }
                    </Link>
                </li>
                <li className="col-6 text-center flex-grow-1">
                    {text}
                    {isAdditionalButton ? children : null}
                </li>
                {isLoggedIn ? (
                    <li className="col-3 d-flex justify-content-end">
                        <NotificationButton />
                    </li>
                )
                : null}

            </ul>
            </div>
         </nav>
    );
};

NavBar.propTypes = {
    text: string,
    isAdditionalButton: bool,
    isLoggedIn: bool.isRequired
}

NavBar.defaultProps = {
    text: "",
    isAdditionalButton: false,
}

const mapStateToProps = (state) => ({
    isLoggedIn: (state.auth.isAuth),
});
export default connect(mapStateToProps)(NavBar);
