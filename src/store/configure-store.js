import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {sagas} from "../saga/sagas";
import rootReducer from "./root-reducer";
import Thunk from "redux-thunk";
import API from "./../API";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(Thunk.withExtraArgument(API), sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;
