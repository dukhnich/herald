import { gql } from "graphql-request";
import uploadFile from "../../shared/helpers/uploadFile";
import API from "../../API";

const createMsg = gql`
  mutation createMsg($text: String, $chat:ChatInput, $media: [MediaInput]) {
    MessageUpsert(message: {text: $text, chat: $chat, media: $media}) {
      _id
    }
  }
`;

const linkMediaWithMsg = gql`
  mutation linkWithMsg($_id: ID!, $messages: [MessageInput]) {
    MediaUpsert(media: {_id: $_id, messages: $messages}) {
      _id
    }
  }
`;

const linkWithMsg = gql`
  mutation linkWithMsg($_id: ID!, $text: String, $chat:ChatInput!, $media: [MediaInput], $replyTo: MessageInput, $replies: [MessageInput]) {
    MessageUpsert(message: {_id: $_id, text: $text, chat: $chat, media: $media, replyTo: $replyTo, replies: $replies}) {
      _id
    }
  }
`;

export const sendMessage = (message) => async (dispatch, _, api) => {
    dispatch({ type: "newMessage/pending" });
    const {attach, text, forwarded, replyTo, chat} = message
    try {
        if (!((attach && attach.length) || text || forwarded)) {
            dispatch({ type: "newMessage/rejected" });
            return
        }
        const values = {...message};
        values.attach && delete values.attach;
        const media = [];
        if (attach && attach.length) {
            for (const file of attach) {
                const currentMedia = await uploadFile(file);
                media.push({_id: currentMedia._id})
            }
        }
        if (media.length) {
            values.media = media
        }
        values.replyTo && delete values.replyTo
        const msg = await API.request(createMsg, values)
        if (media.length) {
            for (const issue of media) {
                const mediaValues = {
                    _id: issue._id,
                    messages: [{_id: msg.MessageUpsert._id}]
                };
                API.request(linkMediaWithMsg, mediaValues)
            }
        }
        if (replyTo && Object.keys(replyTo).length) {
            const replyToValues = {
                _id: msg.MessageUpsert._id,
                chat: {_id: chat._id},
                replyTo: {_id: replyTo._id}
            };
            await API.request(linkWithMsg, replyToValues);
        }
        dispatch({ type: "newMessage/send/resolved", payload: message });
    }
    catch (error) {
        console.log(error)
        dispatch({ type: "newMessage/rejected" });
    }
};

