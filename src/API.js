import { GraphQLClient } from "graphql-request";
import openSocket from 'socket.io-client';

export const ENDPOINT =
    "http://chat.fs.a-level.com.ua";

const client = new GraphQLClient(ENDPOINT+"/graphql");

const token = localStorage.getItem("token");

export const socket = openSocket(ENDPOINT);
if (token !== null) {
    console.log("token", token);
    socket.emit('jwt', token);
    socket.on('jwt_ok',   data => console.log(data))
socket.on('jwt_fail', error => console.log(error))
socket.on('msg', msg => console.log(msg))
    client.setHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
}

export default client;
