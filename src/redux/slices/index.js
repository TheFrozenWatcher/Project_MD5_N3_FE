import { combineReducers } from "redux";
import categorySlice from "./categorySlice";

import usersSlice from "./userSlice";

const reducers = combineReducers({
    user:usersSlice,
  category:categorySlice
});

export default reducers;