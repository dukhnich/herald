import React from "react";
import Avatar from "./Avatar/Avatar";
import {connect} from "react-redux";
import {ENDPOINT} from "../../API";

const createTime = (timestamp) => {
    const time = new Date(isNaN(+timestamp) ? timestamp : +timestamp);
    const today = new Date();
    const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric"};
    let timeMsg;
    if (time.getDate() === today.getDate()) {
        timeMsg = time.toLocaleTimeString()
    }
    else {
        timeMsg = time.toLocaleDateString("ru", timeOptions)
    }
    return timeMsg
};

const MessageItem = ({message, isActive, currentUser}) => {
    const { text, createdAt, owner, media} = message;
    const time = createTime(createdAt)

    return (
        <>
            <h6
                className={"text-white" + (currentUser._id === owner._id ? " text-right" : "")}
            >
                {owner.nick}
            </h6>
            <div
                className={"d-flex align-items-start" + (currentUser._id === owner._id ? " justify-content-end" : " justify-content-start")}
            >
                <Avatar data={owner} isBig={false} isUser={true}/>
                <div
                    className={"shadow p-4 bg-white" + (currentUser._id === owner._id ? " order-first" : "")}
                >
                    <pre className={"message-text"}>{text}</pre>
                    {media && media.length ? media.map(issue => (
                        <img
                            key = {issue._id}
                            className={"my-auto"}
                            src={ENDPOINT+"/"+issue.url}
                            alt={issue.text || ""}
                        />
                    ))
                    : null}
                    <time
                        className={"d-block brown-text small mb-0" + (currentUser._id === owner._id ? " text-right" : "")}
                        dateTime={isNaN(+createdAt) ? createdAt : new Date (+createdAt).toISOString()}
                    >
                        {time}
                    </time>
                </div>
            </div>
        </>
    );
};


const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(MessageItem);