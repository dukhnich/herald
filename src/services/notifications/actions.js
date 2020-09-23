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

export const getNotifications = (notification) => async (dispatch, _, api) => {
    try {
        dispatch({ type: "notifications/pending" });
        const values = {
            query: JSON.stringify([
                {
                    "_id": notification.owner._id
                }
            ])
        }
        const  data  = await api.request(loadAvatar, values);
        if (data === null) {
            dispatch({ type: "notifications/add/rejected" });
        }

        const {
            UserFindOne: user
        } = data;
        dispatch({
            type: "notifications/add/resolved",
            payload: {
                ...notification,
                owner: {...notification.owner, ...user}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: "notifications/rejected" });
    }
};

export const removeNotifications = (notifications) => async (dispatch, _, api) => {
    try {
        dispatch({ type: "notifications/pending" });
        dispatch({
            type: "notifications/remove/resolved",
            payload: notifications
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: "notifications/rejected" });
    }
};
