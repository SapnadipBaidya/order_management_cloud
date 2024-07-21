import { all, fork } from "redux-saga/effects";
import watcherChatbotSaga from "./handlers/chatBotFetch";
import watcherMapMenuSaga from "./handlers/mapMenuFetch";


export default function* rootSaga() {
  yield all([watcherChatbotSaga,watcherMapMenuSaga].map(fork));
}
//fork helps to run wathcers in a non blocking way //assigning each thread for each watcher

// all helps to run all the reducers parallely