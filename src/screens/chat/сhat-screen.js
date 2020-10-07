import React from "react";
import {Redirect, useParams} from "react-router-dom";
import NavBar from "../../shared/components/navigation/NavBar";
import MessageList from "./components/messages/MessageList";
import {connect} from "react-redux";
import ChatFooter from "./components/footer/ChatFooter";
import ChatSettingsButton from "./components/settings/ChatSettingsButton";
import {loadChat} from "../../services/currentChat";

const Chat = ({goTo, dispatch, currentChat}) => {
    const {id} = useParams();

    React.useEffect(() => {
            dispatch(loadChat(id));
        }
        ,[dispatch, id])

    if (goTo) {
        return <Redirect to={`/chats/${goTo}`} />;
    }

    return (
        <div className={"vh-100 my-wrapper "}>
            <NavBar text = {currentChat.title ? currentChat.title : "Chat"} isAdditionalButton={true}>
                {currentChat._id ? (
                    <ChatSettingsButton/>
                )
                    : null
                }
            </NavBar>
            <MessageList/>
            <ChatFooter chatID = {id}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentChat: state.currentChat.currentChat,
    goTo: state.currentChat.goTo,
});

export default connect(mapStateToProps)(Chat);