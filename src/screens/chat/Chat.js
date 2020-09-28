import React from "react";
import {useParams} from "react-router-dom";
import {gql} from "graphql-request";
import client from "../../API";
import NavBar from "../../shared/components/navigation/NavBar";
import Spinner from "../../shared/components/Spinner";
import MessageList from "./components/MessageList";
import {connect} from "react-redux";
import {removeNotifications} from "../../services/notifications";
import ChatFooter from "./components/ChatFooter";
import ChatSettingsButton from "./components/ChatSettingsButton";

const loadChatQuery = gql`
  query chatFind($query: String) {
    ChatFindOne(query: $query) {
        _id
        title
        members {
            _id
            nick
            avatar {url}
        }
        owner {
            _id 
            nick
            avatar {_id url}
        }
        messages {
            _id
            createdAt
            owner {
                _id 
                nick
                avatar {_id url}
            }
            text
            media {url}
            replies {_id}
            replyTo {_id}
            forwarded {_id}
            forwardWith {_id}
        }
        avatar {
            url
        }
    }    
  }
`;

const Chat = ({notifications, dispatch, currentUser}) => {
    const { id } = useParams();
    const [chat, setChat] = React.useState({})
    const [status, setStatus] = React.useState("pending")
    const [newMessages, setNewMessages] = React.useState([]);
    const [timeoutId, setTimeoutId] = React.useState(null);
    const[needLoad, setNeedLoad] = React.useState(true)

    const onChangeData = () => {
        setNeedLoad (true)
    }

    const loadChat = () => {
        const values = {
            query: JSON.stringify([
                {"_id": id}
            ])
        }
        client.request(loadChatQuery, values)
            .then(r => {
                setStatus("resolved")
                setChat(r.ChatFindOne);
                dispatch(removeNotifications(id));
                setNewMessages([]);
            })
            .catch(error => {
                    setStatus("rejected")
                    console.log(error)
                }
            );
    }

    const deleteNotification = () => {
        setTimeoutId((prev) => {
            if (prev) {
                clearTimeout(prev)
            }
            return setTimeout(() => {
                    loadChat();
                },
                5000)
        })

        return () => clearTimeout(timeoutId)
    }

    React.useEffect( ()=>{
            if (needLoad) {
                loadChat()
                setNeedLoad(false)
            }
        },
        [needLoad])

    React.useEffect( ()=>{
        const thisChatNotifications = notifications.reduce((prev, chat) => 
            chat._id === id ? chat.notifications : prev, 
            []);

        if (thisChatNotifications.length) {
            const myNewMsg = thisChatNotifications.filter(msg => msg.owner._id === currentUser._id);
            if (myNewMsg.length) {
                loadChat();
            }
            else {
                setNewMessages(thisChatNotifications);
            }
        }
    },[notifications])

    React.useEffect( ()=>{
        if (newMessages.length) {
            deleteNotification()
        }
    },[newMessages])

    return (
        <div className={"vh-100 my-wrapper "}>
            <NavBar text = {chat.title ? chat.title : "Chat"} isAdditionalButton={true}>
                {chat._id ? (
                    <ChatSettingsButton chat = {chat} onChangeData = {onChangeData}/>
                )
                    : null
                }
            </NavBar>
            <main className={"p-4"}>
                {status === "pending" ? <Spinner /> : null}
                {status === "resolved" && chat.messages ? (
                        <MessageList messages={chat.messages} newMsg = {newMessages}/>
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
    notifications: state.notifications.chats,
});

export default connect(mapStateToProps)(Chat);