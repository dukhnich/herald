import { GraphQLClient } from "graphql-request";

const ENDPOINT =
    "http://chat.fs.a-level.com.ua/graphql";

export const client = new GraphQLClient(ENDPOINT);

const token = localStorage.getItem("token");
if (token !== null) {
    console.log("token", token);
    client.setHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
}

export default client;
