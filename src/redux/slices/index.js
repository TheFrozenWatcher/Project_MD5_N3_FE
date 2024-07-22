import { combineReducers } from "redux";
import categorySlice from "./categorySlice";

import usersSlice from "./userSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import bannerSlice from "./bannerSlice";

const reducers = combineReducers({
  auth: authSlice,
  user: usersSlice,
  category: categorySlice,
  product: productSlice,
  banner: bannerSlice,
});

export default reducers;