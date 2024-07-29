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
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import reviewSlice from "./reviewSlice";
import productDetailSlice from "./productDetailSlice";
import messageSlice from "./messageSlice";

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
  cart:cartSlice,
  order:orderSlice,
  review:reviewSlice,
  productDetail:productDetailSlice,
  message:messageSlice,
});

export default reducers;
