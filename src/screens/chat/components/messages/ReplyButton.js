import React from "react";
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";

const ReplyButton = ({msg, currentChat, dispatch}) => {

    const onReply = () => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{
                replyTo: msg,
                chat: {_id: currentChat._id}
            }
        })
    }
    return (
        <div className={"mr-3"}>
            <button
                className={"custom-button mr-1 p-1"}
                type={"button"}
                onClick={onReply}
            >
                <Icon
                    icon="reply"
                    color={"#00a0ff"}
                    size={"1.5em"}
                />
            </button>
            Reply
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
});

export default connect(mapStateToProps)(ReplyButton);