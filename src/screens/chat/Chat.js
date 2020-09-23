import React from "react";
import {useParams} from "react-router-dom";
import {gql} from "graphql-request";
import client from "../../API";
import NavBar from "../../shared/components/navigation/NavBar";
import Spinner from "../../shared/components/Spinner";
import API from "../../API";
import MessageList from "./components/MessageList";
import {connect} from "react-redux";
import {removeNotifications} from "../../services/notifications";
import Icon from "../../shared/icon";

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

const createMsg = gql`
  mutation createMsg($text: String, $chat:ChatInput) {
    MessageUpsert(message: {text: $text, chat: $chat}) {
      _id
    }
  }
`;

const Chat = ({notifications, dispatch, currentUser}) => {
    const { id } = useParams();
    const [chat, setChat] = React.useState({})
    const [status, setStatus] = React.useState("pending")
    const [msg, setMsg] = React.useState("");
    const [newMessages, setNewMessages] = React.useState([]);
    const thisChatNotifications = chat._id ? notifications.filter(msg => msg.chat._id === chat._id) : [];

    const onChange = (e) => {
        setMsg(e.target.value)
    };

    const loadChat = () => {
        const values = {
            query: JSON.stringify([
                {
                    "_id": id
                }
            ])
        }

        client.request(loadChatQuery, values)
            .then(r => {
                setStatus("resolved")
                setChat(r.ChatFindOne);
            })
            .catch(error => {
                    setStatus("rejected")
                    console.log(error)
                }
            );
    }

    const sendMsg = (e) => {
        e.preventDefault();
        API.request(createMsg
            , {
                text: msg,
                chat: {_id: id}
            }
        )
            .then(()=> setMsg("")
            )
            .catch(e => {
                console.log(e);
            });
    };

    const removeNotification = (notes) => {
        if (notes.length) {

            const timeoutId = setTimeout(() => {
                    console.log("start remove");
                    dispatch(removeNotifications(notes));
                    setNewMessages([]);
                    loadChat();
                },
                5000)
            return () => clearTimeout(timeoutId)
        }
    }

    React.useEffect(() => {
           loadChat()
        },
        [])

    React.useEffect( ()=>{
        if (thisChatNotifications.length) {
            const myNewMsg = thisChatNotifications.filter(msg => msg.owner._id === currentUser._id);
            if (myNewMsg.length) {
                dispatch(removeNotifications(thisChatNotifications));
                loadChat();
            }
            else {
                setNewMessages(thisChatNotifications);
            }
        }
    },[thisChatNotifications])

    React.useEffect( ()=>{
        if (newMessages.length) {
                removeNotification(thisChatNotifications)
        }
    },[newMessages])

    return (
        <div className={"vh-100 my-wrapper "}>
            <NavBar text = {chat.title ? chat.title : "Chat"}/>
            <main className={"p-4"}>
                {status === "pending" ? <Spinner /> : null}
                {status === "resolved" && chat.messages ? (
                        <MessageList messages={chat.messages} newMsg = {newMessages}/>
                    )
                    : null
                }
            </main>
            <div className={"black-footer p-3"}>

                <button
                    onClick={sendMsg}
                    aria-label={"send message"}
                    type ="button"
                    className={"custom-button round-button"}>
                    <Icon icon="send" />
                </button>
                <div>
                    <textarea
                        className={"black-input"}
                        placeholder={"Type message"}
                        name={"msg"}
                        value={msg}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser.currentUser,
    notifications: state.notifications.notifications,
});

export default connect(mapStateToProps)(Chat);