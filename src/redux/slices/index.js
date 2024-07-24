import { combineReducers } from "redux";
import categorySlice from "./categorySlice";

import usersSlice from "./userSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import commentSlice from "./commentSlice";

const reducers = combineReducers({
  auth: authSlice,
  user: usersSlice,
  category: categorySlice,
  product: productSlice,
  comment:commentSlice,
});

export default reducers;