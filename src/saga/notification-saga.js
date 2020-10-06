import { take, call, put } from 'redux-saga/effects';

import { getNotificationChannel } from "./channels";
import { getNotifications } from "../services/notifications";

export function * notificationSaga() {
    const channel = yield call(getNotificationChannel);

    while (true) {
        const notification = yield take(channel);

        const action = getNotifications(notification);

        yield put(action);
    }
}