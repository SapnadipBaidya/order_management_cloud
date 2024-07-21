import { call, put, takeLatest,select } from "redux-saga/effects";
import { makeAPIcall, makeGetAPIcall } from "./constants";

function* handleFetchMapMenu() {
  //this is worker saga
 
  try {
    //call ->  put  // both of this works togather
    const payload = yield select((state=>state?.mapMenuReducer.payload))
    const url = `http://localhost:8081/api/menu/${payload}`;
    const Response = yield call(makeGetAPIcall,url);
    // console.log("inside try");
    console.log(Response);
    // console.log("inside try");

    yield put({ type: "MAP_MENU_SUCCESS", mapMenuResponse: Response?.data });
    //put is dispatching a new action with the result from the previous yield. here (users) is the result from previous yield
  } catch (err) {
    console.log("inside err");
    console.log(err);
    yield put({ type: "MAP_MENU_FAILURE", message: err.message });
  }
}
console.log("hello above inside watcherMapMenuSaga generator");

function* watcherMapMenuSaga() {
  //this is watcher saga
  console.log("hello inside watcherMapMenuSaga above yield");
  yield takeLatest("MAP_MENU_REQUESTED", handleFetchMapMenu); //watcher constantly checks for GET_TO_CALL_USERS_FAILED to come in , once it came then it runs the function

  console.log("hello inside watcherMapMenuSaga below yeild");
}

export default watcherMapMenuSaga;
