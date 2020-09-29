import React from "react";
import Icon from "../../../shared/icon";
import API from "../../../API";
import {gql} from "graphql-request";
import uploadFile from "../../../shared/helpers/uploadFile";

const createMsg = gql`
  mutation createMsg($text: String, $chat:ChatInput, $media: [MediaInput]) {
    MessageUpsert(message: {text: $text, chat: $chat, media: $media}) {
      _id
    }
  }
`;

const linkMediaWithMsg = gql`
  mutation linkMediaWithMsg($_id: ID!, $messages: [MessageInput]) {
    MediaUpsert(media: {_id: $_id, messages: $messages}) {
      _id
    }
  }
`;

const ChatFooter = ({chatID}) => {
    const [msg, setMsg] = React.useState("");
    const [attach, setAttach] = React.useState(null);

    const addAttach = (event) => {
        const file = event.target.files[0];
        setAttach (file)
    }

    const removeAttach = () => {
        setAttach (null)
    }


    const onChange = (e) => {
        setMsg(e.target.value)
    };

    const sendMsg = async (e) => {
        e.preventDefault();
        const values = {
            text: msg,
            chat: {_id: chatID}
        };
        let media;
        if (attach) {
            media = await uploadFile(attach);
            values.media = [{
                _id: media._id,
            }]
        }
        console.log(media)
        API.request(createMsg, values)
            .then((r)=> {
                    console.log(r)
                    if (media) {
                        const mediaValues = {
                            _id: media._id,
                            messages: [{_id: r.MessageUpsert._id}]
                        };
                        API.request(linkMediaWithMsg, mediaValues)
                    }
                }
            )
            .then((r)=> {
                // console.log(r)

                    setMsg("")
                }
            )
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className={"black-footer p-3 d-flex align-items-start justify-content-between"}>
            <button
                onClick={sendMsg}
                aria-label={"send message"}
                type ="button"
                className={"custom-button round-button"}>
                <Icon icon="send" />
            </button>
            <label className={"pt-2"}>
                <Icon
                    color={attach ? "#ffbdb8" : "#ffffff"}
                    icon="camera"
                    size={"1.3rem"}
                />
                <input
                    onInput={addAttach}
                    className={"custom-file-input"}
                    type={"file"}
                    name={"media"}
                />
            </label>
            {attach ?
                <button
                    onClick={removeAttach}
                    type={"button"}
                    className={"custom-button pt-2 ml-3"}
                >
                    <Icon
                        color={"#ffbdb8"}
                        icon="cross"
                        size={"1rem"}
                    />
                </button>
                : null}
                    <textarea
                        className={"black-input p-2 ml-3 flex-grow-1"}
                        placeholder={"Type message"}
                        name={"msg"}
                        value={msg}
                        onChange={onChange}
                    />
        </div>
    )
}

export default ChatFooter