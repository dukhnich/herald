import React from "react";
import {Link} from "react-router-dom";
import FormFooter from "../form/FormFooter";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav flex-row">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            <div className={"triangle triangle-left"}/>
                        </Link>
                    </li>
                    <li className="nav-item ml-auto">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default NavBar