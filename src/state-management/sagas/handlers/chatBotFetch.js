import { call, put, takeLatest,select } from "redux-saga/effects";
import { makeAPIcall } from "./constants";

function* handleChatbot() {
  //this is worker saga
  const url = `http://127.0.0.1:8082/chatbot`;
  try {
    //call ->  put  // both of this works togather
     const payload = yield select((state=>state?.chatBotReducer.payload))
    
    const chatBotResponse = yield call(makeAPIcall,url,payload.toString());
    // console.log("inside try");
    console.log(chatBotResponse);
    // console.log("inside try");

    yield put({ type: "CHAT_BOT_SUCCESS", chatBotResponse: chatBotResponse });
    console.log("chatBotResponse " + chatBotResponse);
    //put is dispatching a new action with the result from the previous yield. here (users) is the result from previous yield
  } catch (err) {
    console.log("inside err");
    console.log(err);
    yield put({ type: "CHAT_BOT_FAILURE", message: err.message });
  }
}
console.log("hello above inside watcherAdduserSaga generator");

function* watcherChatbotSaga() {
  //this is watcher saga
  console.log("hello inside watcherAdduserSaga above yield");
  yield takeLatest("CHAT_BOT_REQUESTED", handleChatbot); //watcher constantly checks for GET_TO_CALL_USERS_FAILED to come in , once it came then it runs the function

  console.log("hello inside watcherAdduserSaga below yeild");
}

export default watcherChatbotSaga;
