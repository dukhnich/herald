import React from "react";
import {ENDPOINT} from "../../../API";
import "./Avatar.css"

const Avatar = ({data, isBig, isUser, children}) => {
    const {avatar} = data
    const login = isUser ? data.login : data.title
    let url;
    if (avatar && avatar.url) {
        url = ENDPOINT+"/"+avatar.url
    }
    else {
        url = isUser ? "images/empty-avatar.png" : "images/empty-chat-avatar.png"
    }
    return (
        <div className={"avatar " + (isBig ? "big-avatar" : "small-avatar")}>
            <img
                className={"my-auto"}
                src={url}
                alt={login}
            />
            {children ? <div className={"avatar-content"}>{children}</div> : null}
        </div>
    )
}

Avatar.defaultProps = {
    isBig: true,
    isUser: true
}

export default Avatar