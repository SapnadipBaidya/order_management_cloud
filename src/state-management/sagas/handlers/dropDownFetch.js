import { call, put, takeLatest,select } from "redux-saga/effects";
import { makeAPIcall, makeGetAPIcall } from "./constants";
const FULL_URL = "http://localhost:8081/dropdownStore/findHQLbyKEY/"
function* handleFetchDropDown() {
  //this is worker saga
 
  try {
    //call ->  put  // both of this works togather
    const payload = yield select((state=>state?.dropdownStoreReducer.payload))
    const url = `${FULL_URL}${payload}`;
    const Response = yield call(makeGetAPIcall,url);
    // console.log("inside try");
    console.log(Response);
    // console.log("inside try");

    yield put({ type: "DROP_STORE_SUCCESS", dropDownResponse: Response?.data });
    //put is dispatching a new action with the result from the previous yield. here (users) is the result from previous yield
  } catch (err) {
    console.log("inside err");
    console.log(err);
    yield put({ type: "DROP_STORE_FAILURE", message: err.message });
  }
}
console.log("hello above inside watcherDropDownSaga generator");

export function* watcherDropDownSaga() {
  //this is watcher saga
  console.log("hello inside watcherDropDownSaga above yield");
  yield takeLatest("DROP_STORE_REQUESTED", handleFetchDropDown); //watcher constantly checks for GET_TO_CALL_USERS_FAILED to come in , once it came then it runs the function

  console.log("hello inside watcherDropDownSaga below yeild");
}

