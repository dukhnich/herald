import React from "react";
import Avatar from "./Avatar/Avatar";
import {connect} from "react-redux";
import MediaList from "../../screens/chat/components/MediaList";
import Icon from "../icon";

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
                    {text ?
                        <pre className={"message-text mb-3"}>{text}</pre>
                    : null}
                    <MediaList media={media}/>
                    <div className={"small brown-text align-items-center d-flex" + (currentUser._id === owner._id ? " justify-content-end" : "")}>
                        <div className={"mr-3"}>
                        <Icon
                            icon="reply"
                            color={"#00a0ff"}
                            className={"mr-1"}
                            size={"1.5em"}
                        />
                        Reply
                        </div>
                        <div className={"mr-3"}>
                        <Icon
                            icon="forward"
                            color={"#00a0ff"}
                            className={"mr-1"}
                            size={"1.5em"}
                        />
                        Forward
                        </div>
                        <time
                            className={"mb-0"}
                            dateTime={isNaN(+createdAt) ? createdAt : new Date (+createdAt).toISOString()}
                        >
                            {time}
                        </time>

                    </div>

                </div>
            </div>
        </>
    );
};


const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(MessageItem);