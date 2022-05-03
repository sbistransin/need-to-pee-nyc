import { combineReducers } from "redux";
import AuthReducer from './reducer-auth';
import preferenceReducer from "./reducer-preferences";

const rootReducer = combineReducers({
  auth: AuthReducer,
  preferences: preferenceReducer,
});

export default rootReducer;