import React from "react";
import HomeScreen from "./home";
import Login from "./login";
import CreateUserForm from "./registration";
import Menu from "./menu";

const NotFound = () => <div> Oops, not found</div>;

export const menuRoutes =   [
    {
        path: "/",
        name: "Profile"
    },
    {
        path: "/registration",
        name: "New user"
    },
]

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
        path: "/menu",
        exact: true,
        children: <Menu/>,
        isProtected: true
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
