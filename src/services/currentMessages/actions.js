import { gql } from "graphql-request";
import uploadFile from "../../shared/helpers/uploadFile";

const createMsg = gql`
  mutation createMsg($_id: ID, $text: String, $chat:ChatInput, $media: [MediaInput], $replyTo: MessageInput, $forwarded: MessageInput) {
    MessageUpsert(message: {_id: $_id, text: $text, chat: $chat, media: $media, replyTo: $replyTo, forwarded: $forwarded}) {
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

export const sendMessage = (message) => async (dispatch, _, api) => {
    dispatch({ type: "newMessage/pending" });
    const {attach, text, forwarded, replyTo, chat, _id} = message
    try {
        if (!((attach && attach.length) || text || forwarded)) {
            dispatch({ type: "newMessage/rejected" });
            return
        }
        const values = {text, chat};
        if (_id) {
            values._id = _id
        }
        if (forwarded) {
            values.forwarded = {_id: forwarded._id}
        }
        if (replyTo) {
            values.replyTo = {_id: replyTo._id}
        }
        const media = [];
        if (Array.isArray(attach) && attach.length) {
            for (const file of attach) {
                if (file._id) {
                    media.push(file)
                }
                else {
                    const currentMedia = await uploadFile(file);
                    media.push({_id: currentMedia._id})
                }
            }
        }
        values.media = media
        // console.log(values)
        const msg = await api.request(createMsg, values)
        if (media.length) {
            for (const issue of media) {
                const mediaValues = {
                    _id: issue._id,
                    messages: [{_id: msg.MessageUpsert._id}]
                };
                api.request(linkMediaWithMsg, mediaValues)
            }
        }
        dispatch({ type: "newMessage/send/resolved", payload: message });
    }
    catch (error) {
        console.log(error)
        dispatch({ type: "newMessage/rejected" });
    }
};

