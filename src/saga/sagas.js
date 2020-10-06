import { fork } from 'redux-saga/effects';

import { notificationSaga } from "./notification-saga";

export function * sagas() {
    yield fork(notificationSaga);
}