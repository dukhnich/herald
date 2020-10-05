import { gql } from "graphql-request";
import uploadFile from "../../shared/helpers/uploadFile";
import API from "../../API";

const createMsg = gql`
  mutation createMsg($text: String, $chat:ChatInput, $media: [MediaInput], $replyTo: MessageInput, $forwarded: MessageInput) {
    MessageUpsert(message: {text: $text, chat: $chat, media: $media, replyTo: $replyTo, forwarded: $forwarded}) {
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

// const linkWithMsg = gql`
//   mutation linkWithMsg($_id: ID!, $text: String, $chat:ChatInput!, $media: [MediaInput], $replyTo: MessageInput, $replies: [MessageInput], $forwarded: MessageInput) {
//     MessageUpsert(message: {_id: $_id, text: $text, chat: $chat, media: $media, replyTo: $replyTo, replies: $replies, forwarded: $forwarded}) {
//       _id
//     }
//   }
// `;

export const sendMessage = (message) => async (dispatch, _, api) => {
    dispatch({ type: "newMessage/pending" });
    const {attach, text, forwarded, replyTo, chat} = message
    try {
        if (!((attach && attach.length) || text || forwarded)) {
            dispatch({ type: "newMessage/rejected" });
            return
        }
        const values = {text, chat};
        if (forwarded) {
            values.forwarded = {_id: forwarded._id}
        }
        if (replyTo) {
            values.replyTo = {_id: replyTo._id}
        }
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
        // console.log(values)
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
        dispatch({ type: "newMessage/send/resolved", payload: message });
    }
    catch (error) {
        console.log(error)
        dispatch({ type: "newMessage/rejected" });
    }
};

