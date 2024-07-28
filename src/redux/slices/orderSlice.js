import { createSlice } from "@reduxjs/toolkit"; import * as status from "../../constants/status"; import { changeOrderStatus, fetchOrderDetail, fetchOrders, } from "../../services/orderService";

 const OrderSlice = createSlice({
  name: "order", initialState: { loading: status.IDLE, data: [], error: null, totalPages: 1, currentPage: 1, currentOrder: null, },

  reducers: {}, extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchOrders.pending, (state) => { state.loading = status.PENDING; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = status.SUCCESS; state.data = action.payload.content || [];
        // Ensure it's an array 
        state.totalPages = action.payload.totalPages || 1; state.currentPage = action.payload.number || 1;
      })


      // View order details
      .addCase(fetchOrderDetail.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = status.SUCCESS;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })
      // Change order status
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.currentOrder = action.payload;
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      });

    ;
  }
});

export default OrderSlice.reducer;