import { combineReducers } from "redux";
import AuthReducer from './reducer-auth';
import userReducer from "./reducer-user";
const rootReducer = combineReducers({
  auth: AuthReducer,
  user: userReducer,
});

export default rootReducer;