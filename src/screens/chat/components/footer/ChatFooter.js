import React from "react";
import SendBtn from "./SendBtn";
import AttachButton from "./AttachButton";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";
import ReplyTo from "./ReplyTo";

const ChatFooter = ({currentChat, currentMessages, dispatch}) => {
    const thisMsg = findThisMessage(currentMessages, currentChat._id)

    const onChange = (e) => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{text: e.target.value, chat: {_id: currentChat._id}}
        })
    };

    return (
        <div className={"black-footer pl-3 pt-3 pb-0 pr-5 d-flex align-items-start"}>
            <SendBtn/>
            <AttachButton />
            <ReplyTo />
            <textarea
                className={"black-input pt-2 ml-3 h-75 flex-grow-1 mr-5"}
                placeholder={"Type message"}
                name={"msg"}
                value={thisMsg.text}
                onChange={onChange}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(ChatFooter);