import { combineReducers } from "redux";
import categorySlice from "./categorySlice";

import usersSlice from "./userSlice";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import commentSlice from "./commentSlice";
import bannerSlice from "./bannerSlice";
import wishListSlice from "./wishListSlice";
import couponSlice from "./couponSlice";
import eventSlice from "./eventSlice";

const reducers = combineReducers({
  auth: authSlice,
  user: usersSlice,
  category: categorySlice,
  product: productSlice,
  comment:commentSlice,
  banner: bannerSlice,
  wishlist: wishListSlice,
  coupon: couponSlice,
  event: eventSlice,
});

export default reducers;
