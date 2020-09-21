import React from "react";
import {useParams} from "react-router-dom";
import {gql} from "graphql-request";
import client from "../../API";
import {loadUser} from "../../services/userData";
import {loadChats} from "../../services/ownersChats";
import NavBar from "../../shared/components/navigation/NavBar";
import Spinner from "../../shared/components/Spinner";
import InputGroup from "../../shared/components/form/InputGroup";
import FormFooter from "../../shared/components/form/FormFooter";
import API from "../../API";
import List from "../../shared/components/List";

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

const Chat = () => {
    const { id } = useParams();
    const [chat, setChat] = React.useState({})
    const [status, setStatus] = React.useState("pending")
    const [msg, setMsg] = React.useState("")

    const onChange = (e) => {
        setMsg(e.target.value)
    };

    const sendMsg = (e) => {
        e.preventDefault();
        API.request(createMsg
            , {
                text: msg,
                chat: {_id: id}
            }
        )
            .catch(e => {
                console.log(e);
            });
    };

    React.useEffect(() => {
            const values = {
                query: JSON.stringify([
                    {
                        "_id": id
                    }
                ])
            }

            client.request(loadChatQuery, values)
                .then (r => {
                    setStatus("resolved")
                    setChat(r.ChatFindOne)
            })
            .catch (error => {
                    setStatus("rejected")
                    console.log(error)
                }
            );
        },
        [])

    return (
        <>
            <NavBar text = {chat.title ? chat.title : "Chat"}/>
            <main>
                {status === "pending" ? <Spinner /> : null}
                {status === "resolved" && chat.messages ? (
                        <List items={chat.messages} />
                    )
                    : null
                }
            </main>
            <div className={"black-footer mt-5"}>

                <button
                    onClick={sendMsg}
                    aria-label={"send message"}
                    type ="button"
                    className={"custom-button round-button"}>
                    >
                </button>
                <div className={"container-small"}>
                    <input
                        className={"black-input"}
                        placeholder={"Type message"}
                        type="text"
                        name={"msg"}
                        onChange={onChange}
                    />
                </div>
            </div>
        </>
    )
}

export default Chat