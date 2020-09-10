import React from "react";
import {Link} from "react-router-dom";
import "./navigation.css"
import {string} from "prop-types";
import InputGroup from "../form/InputGroup";
import FormFooter from "../form/FormFooter";

const NavBar = ({text}) => {
    return (
        <nav className="navbar navbar-expand-lg navigation-bar mb-4">
            <div className="navbar-collapse">
                <div className={"container-small"}>

                <ul className="navbar-nav flex-row align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            <div className={"triangle triangle-left"}/>
                        </Link>
                    </li>
                    <li className="nav-item text-center flex-grow-1">
                        {text}
                    </li>

                </ul>
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    text: string
}

export default NavBar