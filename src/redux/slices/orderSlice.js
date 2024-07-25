import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getOrders } from "../../services/orderService";


const orderSlice = createSlice({
    name: "order",
    initialState: {
      loading: [IDLE],
      data: null,
      error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(getOrders.pending, (state) => {
        state.loading = [PENDING];
      });
  
      builder.addCase(getOrders.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading =[SUCCESS];
      });
      builder.addCase(getOrders.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error;
      });
    },
  });
  export default orderSlice.reducer;