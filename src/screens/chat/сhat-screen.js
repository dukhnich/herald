import React from "react";
import {Redirect, useParams} from "react-router-dom";
import NavBar from "../../shared/components/navigation/NavBar";
import Spinner from "../../shared/components/Spinner";
import MessageList from "./components/messages/MessageList";
import {connect} from "react-redux";
import ChatFooter from "./components/footer/ChatFooter";
import ChatSettingsButton from "./components/settings/ChatSettingsButton";
import {loadChat} from "../../services/currentChat";

const Chat = ({notifications, goTo, dispatch, currentUser, currentChat, status}) => {
    const {id} = useParams();
    const [newMessages, setNewMessages] = React.useState([]);
    const [timeoutId, setTimeoutId] = React.useState(null);
    const[needLoad, setNeedLoad] = React.useState(true);

    const onChangeData = () => {
        setNeedLoad (true)
    }

    const loadCurrentChat = () => {
        dispatch(loadChat(id));
        setNewMessages([])
    }

    const deleteNotification = () => {
        setTimeoutId((prev) => {
            if (prev) {
                clearTimeout(prev)
            }
            return setTimeout(() => {
                    loadCurrentChat();
                },
                5000)
        })
        return () => clearTimeout(timeoutId)
    }


    React.useEffect( ()=>{
        if (goTo) {
            dispatch(loadChat(goTo));
        }

        if (needLoad) {
            loadCurrentChat()
            setNeedLoad(false)
        }
        if (newMessages.length) {
            deleteNotification()
        }
    },[goTo, needLoad, newMessages])

    React.useEffect(() => {
        const thisChatNotifications = notifications.reduce((prev, chat) =>
                chat._id === id ? chat.notifications : prev,
            []);

        if (thisChatNotifications.length) {
            const myNewMsg = thisChatNotifications.filter(msg => msg.owner._id === currentUser._id);
            if (myNewMsg.length) {
                loadCurrentChat();
            }
            else {
                setNewMessages(thisChatNotifications);
            }
        }
    },[currentUser._id, id, notifications])

    if (goTo) {
        return <Redirect to={`/chats/${goTo}`} />;
    }

    return (
        <div className={"vh-100 my-wrapper "}>
            <NavBar text = {currentChat.title ? currentChat.title : "Chat"} isAdditionalButton={true}>
                {currentChat._id ? (
                    <ChatSettingsButton onChangeData = {onChangeData}/>
                )
                    : null
                }
            </NavBar>
            <main className={"px-4"}>
                {status === "pending" ? <Spinner /> : null}
                {status === "resolved" && currentChat.messages ? (
                        <MessageList messages={currentChat.messages} newMsg = {newMessages}/>
                    )
                    : null
                }
            </main>
            <ChatFooter chatID = {id}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentChat: state.currentChat.currentChat,
    goTo: state.currentChat.goTo,
    status: state.currentChat.status,
    notifications: state.notifications.chats,
});

export default connect(mapStateToProps)(Chat);