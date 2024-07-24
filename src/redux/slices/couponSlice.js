import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { addCoupon, getCoupons } from "../../services/adminService";

const couponSlice = createSlice({
  name: "admin",
  initialState: {
    loading: [IDLE],
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state) => {
      state.loading = [PENDING];
    });

    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = [SUCCESS];
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.loading = [FAILED];
      state.error = action.error;
    });
    builder.addCase(addCoupon.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.loading = [SUCCESS];
    });
    builder.addCase(addCoupon.rejected, (state, action) => {
      state.loading = [FAILED];
      state.error = action.payload;
      console.log(action);
      console.log(state.error);
    });
  },
});
export default couponSlice.reducer;
