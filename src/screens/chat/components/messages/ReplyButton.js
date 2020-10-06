import React from "react";
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";

const ReplyButton = ({msg, currentChat, currentMessages, dispatch}) => {
    const [isReplyed, setReplyed] = React.useState(false);
    React.useEffect(() => {
        const thisMsg = findThisMessage(currentMessages, currentChat._id)
        if (thisMsg.replyTo && thisMsg.replyTo._id !== msg._id && isReplyed) {
            setReplyed(false)
        }
    },[currentChat._id, currentMessages, isReplyed, msg._id])

    const onReply = () => {
        if (isReplyed) {
            setReplyed(false);
            dispatch({
                type: "newMessage/changeInfo",
                payload: {
                    replyTo: {},
                    chat: {_id: currentChat._id}
                }
            })
            return
        }
        setReplyed(true);
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
                    color={isReplyed ? "#ffbdb8" : "#00a0ff"}
                    size={"1.5em"}
                />
            </button>
            Reply
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,

});

export default connect(mapStateToProps)(ReplyButton);