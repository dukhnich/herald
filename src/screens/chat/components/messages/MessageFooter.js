import React from "react";
import {connect} from "react-redux";
import ReplyButton from "./ReplyButton";
import ForwardButton from "./ForwardButton";

const MessageFooter = ({msg, currentUser}) => {
    const { createdAt, owner} = msg;

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

    const time = createTime(createdAt)

    return (
        <div className={"small brown-text align-items-center d-flex" + (currentUser._id === owner._id ? " justify-content-end" : "")}>
            <ReplyButton msg = {msg}/>
            <ForwardButton msg = {msg}/>
            <time
                className={"mb-0 text-right"}
                dateTime={isNaN(+createdAt) ? createdAt : new Date (+createdAt).toISOString()}
            >
                {time}
            </time>

        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
});

export default connect(mapStateToProps)(MessageFooter);