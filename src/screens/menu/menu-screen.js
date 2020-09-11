import React from "react";
import MenuFooter from "./MenuFooter";
import {menuRoutes} from "../index";
import {Link} from "react-router-dom";
import {gql} from "graphql-request";
import API from "./../../API";


const query = gql`
  query userFind {
    ChatFind(query: "[{}]") {
        owner {nick}
        members {nick}
    }    
  }
`;
API.request(query)
    .then(r=>console.log(r))
const Menu = () => {

    return (
        <>
            <div className={"container-small"}>
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

            </div>
            <MenuFooter/>
        </>
    );
};

export default Menu
