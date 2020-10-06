import React from "react";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";
import LinkedMsg from "../LinkedMsg";

const ReplyTo = ({currentChat, currentMessages, dispatch}) => {

    const thisMsg = findThisMessage(currentMessages, currentChat._id)
    const onClick = () => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{
                replyTo: {},
                chat: {_id: currentChat._id}
            }
        })
    }
    return (
        thisMsg.replyTo && Object.keys(thisMsg.replyTo).length ? (
            <div
                onClick={onClick}
                className={"mx-1 flex-grow-1 w-50"}
            >
                <LinkedMsg msg={thisMsg.replyTo} />
            </div>
        )
        : null

    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(ReplyTo);