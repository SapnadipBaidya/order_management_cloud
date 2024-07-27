
import chatBotReducer from "./chatBotReducer";

import { combineReducers } from "redux";
import { adminMenuReducer, mapMenuReducer } from "./mapMenuReducer";
import dropdownStoreReducer from "./dropdownStoreReducer";


const reducers = combineReducers({
  chatBotReducer:chatBotReducer,
  mapMenuReducer:mapMenuReducer,
  adminMenuReducer:adminMenuReducer,
  dropdownStoreReducer:dropdownStoreReducer

});

export default reducers;
