import React from "react";
import Avatar from "../../../../shared/components/Avatar/Avatar";
import {connect} from "react-redux";
import MediaList from "./MediaList";
import MessageFooter from "./MessageFooter";

const MessageItem = ({message, currentUser}) => {
    const { text, owner, media} = message;
    return (
        <li className={"py-3"}>
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
                        <pre className={"message-text mb-3 text-break"}>{text}</pre>
                        : null
                    }
                    <MediaList media={media}/>
                    <MessageFooter msg = {message}/>
                </div>
            </div>
        </li>
    );
};


const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(MessageItem);