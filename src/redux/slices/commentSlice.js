import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../constants/status";
import { createComment, deleteCommentById, fetchAllCommentsByProduct, toggleComment, updateComment } from "../../services/commentService";

const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: status.IDLE,
    data: [],
    error: null,
    currentComment: null,
    moderator: false,
    userCommentExists: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all comments by product
      .addCase(fetchAllCommentsByProduct.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchAllCommentsByProduct.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.data = action.payload.comments || [];
        state.userCommentExists = action.payload.userCommentExists || false;
        state.moderator = action.payload.moderator;
      })
      .addCase(fetchAllCommentsByProduct.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Delete comment by ID
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.data = action.payload.comments || [];
        state.userCommentExists = action.payload.userCommentExists || false;
        state.moderator = action.payload.isModerator || false;
      })
      .addCase(deleteCommentById.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Create comment
      .addCase(createComment.fulfilled, (state, action) => {
        state.userCommentExists = true;
        state.data.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Update comment
      .addCase(updateComment.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Toggle visibility
      .addCase(toggleComment.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(toggleComment.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
      })
      .addCase(toggleComment.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      });
  }
});

export default CommentSlice.reducer;
