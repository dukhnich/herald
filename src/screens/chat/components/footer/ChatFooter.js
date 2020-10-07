import React from "react";
import SendBtn from "./SendBtn";
import AttachButton from "./AttachButton";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";
import ReplyTo from "./ReplyTo";
import Forwarded from "./Forwarded";
import EmojiButton from "./EmojiButton";

const ChatFooter = ({currentChat, currentMessages, dispatch}) => {
    const thisMsg = findThisMessage(currentMessages, currentChat._id)

    const onChange = (e) => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{text: e.target.value, chat: {_id: currentChat._id}}
        })
    };

    return (
        <div className={"black-footer p-3 flex-shrink-0"}>
            <SendBtn/>
            <div className={"d-flex w-75"}>
                <ReplyTo />
                <Forwarded />
            </div>
            <div className={"d-flex align-items-start"}>
                <EmojiButton />
                <AttachButton />
                <textarea
                    className={"black-input pt-2 mx-3 flex-shrink-1 flex-grow-1"}
                    placeholder={"Type message"}
                    name={"msg"}
                    value={thisMsg.text}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(ChatFooter);