import {gql} from "graphql-request";
import API from "../../API";
import {loadUser} from "../../services/userData";
import {loadChats} from "../../services/ownersChats";

const addOrDeleteMemberMutation = gql`
  mutation changeMembers($_id: ID!, $members:[UserInput]) {
    ChatUpsert(chat: {_id: $_id, members: $members}) {
      _id
      owner {_id nick}
      members {_id nick}
    }
  }
`;

const addOrDeleteMember = (dispatch, userID, chat, add = true) => {
    const {_id, members} = chat;
    let newMembers = members.map(member => ({_id: member._id}));
    if (add) {
        newMembers.push({_id: userID});
    } else {
        newMembers = newMembers.filter(member => member._id !== userID);

    }
    API.request(addOrDeleteMemberMutation
        , {
            _id: _id,
            members: newMembers
        }
    )
        .then((r) => {
            dispatch(loadUser(userID));
            dispatch(loadChats(userID));
        })
        .catch(e => {
            console.log(e);
        });
}

export default addOrDeleteMember