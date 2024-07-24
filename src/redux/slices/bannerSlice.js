import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { deleteBanner, getAllBanners } from "../../services/adminService";


const bannerSlice = createSlice({
    name: "banner",
    initialState: {
      loading: [IDLE],
      data: null,
      error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(getAllBanners.pending, (state) => {
        state.loading = [PENDING];
      });
  
      builder.addCase(getAllBanners.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading =[SUCCESS];
      });
      builder.addCase(getAllBanners.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error;
      });
      builder.addCase(deleteBanner.fulfilled, (state, action) => {
       state.data = state.data.filter(banner => banner!==action.payload);
      });
    },
  });
  export default bannerSlice.reducer;