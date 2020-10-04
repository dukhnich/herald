import React from "react";
import Icon from "../../../../shared/icon";
import {connect} from "react-redux";
import {sendMessage} from "../../../../services/currentMessages";
import {findThisMessage} from "../../FindThisMessage";

const SendBtn = ({currentChat, dispatch, currentMessages}) => {
    const thisMsg = findThisMessage(currentMessages, currentChat._id)

    const sendMsg = async (e) => {
        e.preventDefault();
        dispatch(sendMessage(thisMsg))
    };

    return (
        <button
            onClick={sendMsg}
            aria-label={"send message"}
            type ="button"
            className={"custom-button round-button"}>
            <Icon icon="send" />
        </button>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(SendBtn);