import React from "react";
import Icon from "../../../shared/icon";
import API from "../../../API";
import {gql} from "graphql-request";

const createMsg = gql`
  mutation createMsg($text: String, $chat:ChatInput) {
    MessageUpsert(message: {text: $text, chat: $chat}) {
      _id
    }
  }
`;

const ChatFooter = ({chatID}) => {
    const [msg, setMsg] = React.useState("");

    const onChange = (e) => {
        setMsg(e.target.value)
    };

    const sendMsg = (e) => {
        e.preventDefault();
        API.request(createMsg
            , {
                text: msg,
                chat: {_id: chatID}
            }
        )
            .then(()=> setMsg("")
            )
            .catch(e => {
                console.log(e);
            });
    };

    return (
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
    )
}

export default ChatFooter