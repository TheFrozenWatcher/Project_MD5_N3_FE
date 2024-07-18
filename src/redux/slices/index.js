import { combineReducers } from "redux";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const reducers = combineReducers({
    auth:authSlice,
    user:userSlice,
});

export default reducers;