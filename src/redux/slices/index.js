import { combineReducers } from "redux";
import categorySlice from "./categorySlice";

import usersSlice from "./userSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import bannerSlice from "./bannerSlice";
import wishListSlice from "./wishListSlice";
import orderSlice from "./orderSlice";
import coupon from "./couponSlice";
import couponSlice from "./couponSlice";

const reducers = combineReducers({
  auth: authSlice,
  user: usersSlice,
  category: categorySlice,
  product: productSlice,
  banner: bannerSlice,
  wishlist: wishListSlice,
  orders: orderSlice,
  coupon: couponSlice,
});

export default reducers;
