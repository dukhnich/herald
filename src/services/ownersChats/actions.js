import { gql } from "graphql-request";

const loadChatsQuery = gql`
  query userFind($query: String) {
    ChatFind(query: $query) {
        _id
        title
        members {
            _id
            nick
            avatar {url}
        }
        owner {_id}
        messages {
            _id
            createdAt
            owner {_id}
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

export const loadChats = (userID) => async (dispatch, _, api) => {
    try {
        dispatch({ type: "loadChats/pending" });
        const values = {
            query: JSON.stringify([
                {
                    "___owner": userID
                },
                {
                    sort:[{title: 1}]
                }
            ])
        }
        const  data  = await api.request(loadChatsQuery, values);
        if (data === null) {
            dispatch({ type: "loadChats/rejected" });
        }

        const {
            ChatFind: chats
        } = data;
        dispatch({ type: "loadChats/resolved", payload: chats })
    } catch (error) {
        console.log(error)
        dispatch({ type: "loadUser/rejected" });
    }
};
