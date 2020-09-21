import React from "react";
import MenuFooter from "./MenuFooter";
import {menuRoutes} from "../index";
import {Link} from "react-router-dom";
import "./menu.css"



const Menu = () => {

    return (
        <>
            <main className={"container-small"}>
                <ul className="list-group">
                {menuRoutes.map(({name, path}, index) => (
                    <li key={index} className={"medium-header menu-item list-group-item"}>
                            <Link to={path} >
                                {name}
                            </Link>
                    </li>
                    )
                )}
                </ul>

            </main>
            <MenuFooter/>
        </>
    );
};

export default Menu
