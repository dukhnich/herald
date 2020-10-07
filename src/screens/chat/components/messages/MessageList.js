import React from "react";
import MessageItem from "./MessageItem";
import Icon from "../../../../shared/icon";
import Spinner from "../../../../shared/components/Spinner";
import {connect} from "react-redux";
import {loadChat} from "../../../../services/currentChat";

const MessageList = ({notifications, dispatch, currentUser, currentChat, status}) => {
    const [newMessages, setNewMessages] = React.useState([]);
    const [timeoutId, setTimeoutId] = React.useState(null);

    const loadCurrentChat = () => {
        dispatch(loadChat(currentChat._id));
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
        if (newMessages.length) {
            deleteNotification()
        }
    },[newMessages])

    React.useEffect(() => {
        const thisChatNotifications = notifications.reduce((prev, chat) =>
                chat._id === currentChat._id ? chat.notifications : prev,
            []);

        if (thisChatNotifications.length) {
            const isMyNewMsg = thisChatNotifications.reduce(
                (prev, msg) => msg.owner._id === currentUser._id ? true : prev,
                false);
            if (isMyNewMsg) {
                loadCurrentChat();
            }
            else {
                setNewMessages(thisChatNotifications);
            }
        }
    },[currentUser._id, currentChat._id, notifications])


    const ul = React.useRef();


    React.useEffect(()=>{
        ul.current.scrollTop = ul.current.scrollHeight;
    },[currentChat.messages, newMessages])

    return (
        <main className={"px-4  flex-shrink-1 overflow-auto m-2"} ref={ul}>
            {status === "pending" ? <Spinner /> : null}
            {status === "resolved" && currentChat.messages ? (
                <ul className={"list-group message-list"}>
                    {currentChat.messages.map((msg) => (
                        <MessageItem message={msg} key={msg._id}/>
                    ))}
                    {newMessages.length ? (<>
                            <li>
                                <h4 className={"subheader text-center mt-3"}>
                                    <Icon color={"#ffffff"} icon="alert" />
                                    <span className={"ml-2"}>New messages</span>
                                </h4>
                            </li>
                            {newMessages.map((msg) => (
                                <MessageItem message={msg} key={msg._id}/>
                            ))}
                        </>)
                        : null
                    }
                </ul>)
                : null
            }
        </main>
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    currentChat: state.currentChat.currentChat,
    status: state.currentChat.status,
    notifications: state.notifications.chats,
});

export default connect(mapStateToProps)(MessageList);