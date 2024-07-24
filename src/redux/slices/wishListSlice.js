import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { deleteWishlist, getWishlist } from "../../services/userService";
import { data } from "autoprefixer";


const wishListSlice = createSlice({
    name: "wishlist",
    initialState: {
      loading: [IDLE],
      data: null,
      error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(getWishlist.pending, (state) => {
        state.loading = [PENDING];
      });
      builder.addCase(getWishlist.fulfilled, (state, action) => {
        state.data = action.payload.content;
        state.loading =[SUCCESS];
      });
      builder.addCase(getWishlist.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error;
      });
      builder.addCase(deleteWishlist.fulfilled, (state, action) => {
       state.data = action.payload.content;
      });
    },
  });
  export default wishListSlice.reducer;