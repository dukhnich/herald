import {gql} from "graphql-request";

export const userQuery = gql`
  query userFind($query: String) {
    UserFindOne(query: $query) {
        _id
        nick
        login
        avatar {
            url
        }
    }    
  }
`;