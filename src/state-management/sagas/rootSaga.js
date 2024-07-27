import { all, fork } from "redux-saga/effects";
import watcherChatbotSaga from "./handlers/chatBotFetch";
import { watcherAdminMenuSaga, watcherMapMenuSaga } from "./handlers/mapMenuFetch";
import { watcherDropDownSaga } from "./handlers/dropDownFetch";


export default function* rootSaga() {
  yield all([watcherChatbotSaga,watcherMapMenuSaga,watcherAdminMenuSaga,watcherDropDownSaga].map(fork));
}
//fork helps to run wathcers in a non blocking way //assigning each thread for each watcher

// all helps to run all the reducers parallely