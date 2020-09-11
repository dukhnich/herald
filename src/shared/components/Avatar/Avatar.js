import React from "react";
import {ENDPOINT} from "../../../API";
import "./Avatar.css"

const Avatar = ({user, children}) => {
    const {avatar, login} = user
    return (
        <div className={"main-avatar"}>
            <img
                className={"my-auto"}
                src={avatar ? ENDPOINT+"/"+avatar.url : "images/empty-avatar.png"}
                alt={login}
            />
            {children ? <div className={"avatar-content"}>{children}</div> : null}
        </div>
    )
}

export default Avatar