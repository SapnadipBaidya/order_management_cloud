
import chatBotReducer from "./chatBotReducer";

import { combineReducers } from "redux";
import { adminMenuReducer, mapMenuReducer } from "./mapMenuReducer";


const reducers = combineReducers({
  chatBotReducer:chatBotReducer,
  mapMenuReducer:mapMenuReducer,
  adminMenuReducer:adminMenuReducer

});

export default reducers;
