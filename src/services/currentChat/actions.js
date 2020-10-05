import { gql } from "graphql-request";
import {removeNotifications} from "../notifications";

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
            chat {_id}
            owner {
                _id 
                nick
                avatar {_id url}
            }
            text
            media {_id url originalFileName type text}
            replies {_id}
            replyTo {_id owner {nick} text media {_id url originalFileName type text}}
            forwarded {_id owner {nick} text media {_id url originalFileName type text}}
            forwardWith {_id}
        }
        avatar {
            url
        }
    }    
  }
`;

export const loadChat = (id) => async (dispatch, _, api) => {
    try {
        dispatch({ type: "loadChat/pending" });
        const values = {
                    query: JSON.stringify([
                        {
                            _id: id
                        }
                    ])
                }
        const  data  = await api.request(loadChatQuery, values);

        if (data === null) {
            dispatch({ type: "loadChat/rejected" });
        }

        const {
            ChatFindOne: chat
        } = data;
        // console.log(chat)
        dispatch(removeNotifications(id));

        dispatch({ type: "loadChat/load/resolved", payload: chat })
    } catch (error) {
        console.log(error)
        dispatch({ type: "loadChat/rejected" });
    }
};