import { eventChannel } from 'redux-saga';

import {socket} from "../API";
import {SocketEvents} from "./socket-events";

export function getNotificationChannel() {
    const subscribe = emitter => {
        socket.on(SocketEvents.newMsg, emitter);

        return () => socket.removeListener(SocketEvents.newMsg, emitter);
    };

    return eventChannel(subscribe);
}