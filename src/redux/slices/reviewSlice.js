import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllReviewsByProductDetailId,
  createReview,
  deleteReviewById,
  updateReview,
  toggleReview,
} from "../../services/reviewService";

const initialState = {
  data: [],
  userCanCreateReview: false,
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReviewsByProductDetailId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReviewsByProductDetailId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.responseList;
        state.userCanCreateReview = action.payload.userCanCreateReview;
      })
      .addCase(fetchAllReviewsByProductDetailId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReviewById.fulfilled, (state, action) => {
        state.data = state.data.filter((review) => review.id !== action.payload);
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(toggleReview.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index].hidden = !state.data[index].hidden;
        }
      });
  },
});

export default reviewSlice.reducer;
