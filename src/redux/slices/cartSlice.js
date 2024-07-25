import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCartItems, deleteCartById, addToCart, updateCart } from '../../services/cartService';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartList || [];
        state.loading = false;
      })
      .addCase(fetchAllCartItems.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteCartById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartById.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCartById.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.cartItems.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          state.cartItems[index] = updatedItem;
        }
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
