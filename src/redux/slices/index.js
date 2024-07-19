import { combineReducers } from "redux";
import categorySlice from "./categorySlice";

import usersSlice from "./userSlice";
import productSlice from "./productSlice";

const reducers = combineReducers({
  auth: authSlice,
  user: usersSlice,
  category: categorySlice,
  product: productSlice,
});

export default reducers;