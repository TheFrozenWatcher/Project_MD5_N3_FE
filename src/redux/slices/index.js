import { combineReducers } from "redux";
import categorySlice from "./categorySlice";
import authSlice from "./authSlice";
import usersSlice from "./userSlice";

const reducers = combineReducers({
    auth:authSlice,
    user:usersSlice,
  category:categorySlice
});

export default reducers;