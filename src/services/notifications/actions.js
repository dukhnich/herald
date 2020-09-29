import { gql } from "graphql-request";

const loadAvatar = gql`
  query userAvatar($query: String) {
    UserFindOne(query: $query) {
        avatar {
            _id
            url
        }
    }    
  }
`;

const loadMedia = gql`
  query messageMedia($query: String) {
    MediaFind(query: $query) {
        _id
        text
        url
        type    
        messages {_id}
    }    
  }
`;

const loadMsg = gql`
  query loadMsg($query: String) {
    MessageFindOne(query: $query) {
        _id
        createdAt
        owner {_id nick avatar {_id url}}
        chat {_id}
        text
        media {_id url messages text {_id}}
        replies {_id}
        replyTo {_id}
        forwarded {_id}
        forwardWith {_id}
    }    
  }
`;

const queryValuesById = (id) => ({
    query: JSON.stringify([
        {
            "_id": id
        }
    ])
})

export const getNotifications = (notification) => async (dispatch, _, api) => {
    try {
        dispatch({ type: "notifications/pending" });
        const values = queryValuesById(notification._id);
        const  data  = await api.request(loadMsg, values);
        if (data === null) {
            dispatch({ type: "notifications/add/rejected" });
        }
        const {MessageFindOne: fullMsg} = data;
        console.log(fullMsg)
        dispatch({
            type: "notifications/add/resolved",
            payload: fullMsg
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: "notifications/rejected" });
    }
};

export const removeNotifications = (chatID) => async (dispatch, _, api) => {
    try {
        dispatch({ type: "notifications/pending" });
        dispatch({
            type: "notifications/remove/resolved",
            payload: chatID
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: "notifications/rejected" });
    }
};
