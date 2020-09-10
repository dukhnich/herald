import React from "react";
import HomeScreen from "./home";
import Login from "./login";
import CreateUserForm from "./registration";

const NotFound = () => <div> Oops, not found</div>;

const routes = [
    {
        path: "/login",
        exact: true,
        children: <Login/>,
        isProtected: false
    },
    {
        path: "/registration",
        exact: true,
        children: <CreateUserForm/>,
        isProtected: false
    },
    {
        path: "/",
        exact: true,
        children: <HomeScreen/>,
        isProtected: true
    },
    {
        children: <NotFound/>,
        isProtected: false
    }
];

export default routes;
