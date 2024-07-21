
import chatBotReducer from "./chatBotReducer";

import { combineReducers } from "redux";
import mapMenuReducer from "./mapMenuReducer";


const reducers = combineReducers({
  chatBotReducer:chatBotReducer,
  mapMenuReducer:mapMenuReducer

});

export default reducers;
