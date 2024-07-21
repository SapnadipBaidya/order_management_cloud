import createSagaMiddleware from "redux-saga";
import {thunk} from "redux-thunk";
import reducers from "./reducers/index"
import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleWares = [thunk,sagaMiddleware];
const store = createStore(
    reducers,
    {},
    compose( applyMiddleware(...middleWares))
)
sagaMiddleware.run(rootSaga);
export default store;