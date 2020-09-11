import { GraphQLClient } from "graphql-request";


export const ENDPOINT =
    "http://chat.fs.a-level.com.ua";

const client = new GraphQLClient(ENDPOINT+"/graphql");

const token = localStorage.getItem("token");

if (token !== null) {
    console.log("token", token);
    client.setHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
}

export default client;
