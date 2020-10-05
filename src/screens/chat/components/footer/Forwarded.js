import React from "react";
import {connect} from "react-redux";
import {findThisMessage} from "../../FindThisMessage";
import LinkedMsg from "../LinkedMsg";

const Forwarded = ({currentChat, currentMessages, dispatch}) => {

    const thisMsg = findThisMessage(currentMessages, currentChat._id)
    const onClick = () => {
        dispatch({
            type: "newMessage/changeInfo",
            payload:{
                forwarded: {},
                chat: {_id: currentChat._id}
            }
        })
    }
    return (
        thisMsg.forwarded && Object.keys(thisMsg.forwarded).length ? (
                <div
                    onClick={onClick}
                    className={"ml-2 flex-grow-1 w-50"}
                >
                    <LinkedMsg msg={thisMsg.forwarded}  isForward = {true}/>
                </div>
            )
            : null

    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    currentMessages: state.currentMessages.currentMessages,
});

export default connect(mapStateToProps)(Forwarded);