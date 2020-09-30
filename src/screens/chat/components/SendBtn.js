import React from "react";
import Icon from "../../../shared/icon";
import uploadFile from "../../../shared/helpers/uploadFile";
import API from "../../../API";
import {gql} from "graphql-request";

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

const SendBtn = ({chatID, attach, message, onSend}) => {
    const sendMsg = async (e) => {
        e.preventDefault();
        if (!attach.length && !message) {
            return null
        }
        const values = {
            text: message,
            chat: {_id: chatID}
        };
        const media = [];
        for (const file of attach) {
            const currentMedia = await uploadFile(file);
            media.push({_id: currentMedia._id})
        }
        if (media.length) {
            values.media = media
        }
        API.request(createMsg, values)
            .then((r)=> {
                    // console.log(r)
                    if (media.length) {
                        for (const issue of media) {
                            const mediaValues = {
                                _id: issue._id,
                                messages: [{_id: r.MessageUpsert._id}]
                            };
                            API.request(linkMediaWithMsg, mediaValues)
                        }

                    }
                }
            )
            .then((r)=> {
                    // console.log(r)

                onSend()
                }
            )
            .catch(e => {
                console.log(e);
            });
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

export default SendBtn