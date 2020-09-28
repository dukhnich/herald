import client from "../../API";
import {gql} from "graphql-request";

const chatsFind = gql`
  query chatFind ($query: String){
    ChatFind(query: $query) {
        _id
        title
        avatar {url}
        owner {_id nick}
        members {_id}
    }    
  }
`;

const usersFind = gql`
  query userFind ($query: String){
    UserFind(query: $query) {
        _id
        nick
        avatar {url}
        chats {_id}
    }    
  }
`;

export const search = async (text, isSearchChat = true) => {
    const key = isSearchChat ? "title" : "nick";
    const request = JSON.stringify([
        {
            [key]: new RegExp(text).toString()
        },
        {
            sort:[{[key]: 1}]
        }
    ])
    const result = await client
        .request((isSearchChat ? chatsFind : usersFind), {
            query: request
        })
    return (isSearchChat ? result.ChatFind : result.UserFind)
};