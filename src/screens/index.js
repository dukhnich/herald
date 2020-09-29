import React from "react";
import HomeScreen from "./home";
import Login from "./login";
import CreateUserForm from "./registration";
import Menu from "./menu";
import Search from "./search";
import Chats from "./chats/chats-screen";
import NavBar from "../shared/components/navigation/NavBar";
import Chat from "./chat/сhat-screen";
const NotFound = () => <NavBar text={"Page not found"}/>

export const menuRoutes =   [
    {
        path: "/",
        name: "Profile"
    },
    {
        path: "/registration",
        name: "New user"
    },
    {
        path: "/search",
        name: "Search"
    },
    {
        path: "/chats",
        name: "Chats"
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
        path: "/search",
        exact: true,
        children: <Search/>,
        isProtected: true
    },
    {
        path: "/chats",
        exact: true,
        children: <Chats/>,
        isProtected: true
    },
    {
        path: "/chats/:id",
        exact: true,
        children: <Chat/>,
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
