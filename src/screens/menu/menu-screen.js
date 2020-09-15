import React from "react";
import MenuFooter from "./MenuFooter";
import {menuRoutes} from "../index";
import {Link} from "react-router-dom";
import {gql} from "graphql-request";
import API from "./../../API";
import "./menu.css"


const query = gql`
  query chatFind ($query: String){
    ChatFind(query: $query) {
        owner {nick}
        members {nick}
        title
    }    
  }
`;

const query0 = gql`
  query chatFind {
    ChatFind(query: "[{}]") {
        owner {nick}
        members {nick}
        title
    }    
  }
`;

const query1 = gql`
  query count1 {
    UserCount(query: "[{}]")
  }
`;

const request = JSON.stringify([
    {
        title: new RegExp("a").toString()
    }
])

// API.request(query, {
//     query: request
// })
//     .then(r=>console.log(r))
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
