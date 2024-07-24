import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../constants/status";
import { fetchAllCommentsByProduct, fetchUserComment } from "../../services/commentService";


const CommentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: status.IDLE,
    data: [],
    error: null,
    totalPages: 1,
    currentComment: null,
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
        state.data = action.payload.comments||[]; // Set the data state to the entire response payload
        state.userComment = action.payload.userComment || null;
        state.userCommentExists = action.payload.userCommentExists||false;
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchAllCommentsByProduct.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      

    // // Delete product by ID
    // .addCase(deleteComment.fulfilled, (state, action) => {
    //   state.data = state.data.filter((cmt) => cmt.id !== action.payload);
    // })

    // // Fetch product form (brands and categories)
    // .addCase(fetchProductForm.pending, (state) => {
    //   state.loading = status.PENDING;
    // })
    // .addCase(fetchProductForm.fulfilled, (state, action) => {
    //   state.loading = status.SUCCESS;
    //   state.brands = action.payload.brandList;
    //   state.categories = action.payload.categoryList;
    //   state.colors=action.payload.colorList;
    // })
    // .addCase(fetchProductForm.rejected, (state, action) => {
    //   state.loading = status.FAILED;
    //   state.error = action.error.message;
    // })

    // // Create product
    // .addCase(createProduct.fulfilled, (state, action) => {
    //   state.data.push(action.payload);
    // })
    // .addCase(createProduct.rejected, (state, action) => {
    //   state.error = action.error.message;
    // })

    // // Update product
    // .addCase(updateProduct.pending, (state) => {
    //   state.loading = status.PENDING;
    // })
    // .addCase(updateProduct.fulfilled, (state, action) => {
    //   state.loading = status.SUCCESS;
    //   const updatedProduct = action.payload;
    //   state.data = state.data.map((product) =>
    //     product.id === updatedProduct.id ? updatedProduct : product
    //   );
    // })
    // .addCase(updateProduct.rejected, (state, action) => {
    //   state.loading = status.FAILED;
    //   state.error = action.error.message;
    // })

    // // Fetch product by ID
    // .addCase(fetchProductById.pending, (state) => {
    //   state.loading = status.PENDING;
    // })
    // .addCase(fetchProductById.fulfilled, (state, action) => {
    //   state.loading = status.SUCCESS;
    //   state.currentProduct = action.payload;
    // })
    // .addCase(fetchProductById.rejected, (state, action) => {
    //   state.loading = status.FAILED;
    //   state.error = action.error.message;
    // })

    //  // User selecting a product by ID
    //  .addCase(selectProductById.pending, (state) => {
    //   state.loading = status.PENDING;
    // })
    // .addCase(selectProductById.fulfilled, (state, action) => {
    //   state.loading = status.SUCCESS;
    //   state.currentProduct = action.payload;
    // })
    // .addCase(selectProductById.rejected, (state, action) => {
    //   state.loading = status.FAILED;
    //   state.error = action.error.message;
    // })
    // // Add/remove from wishlist
    // .addCase(toggleWishlist.pending, (state) => {
    //   state.loading = status.PENDING;
    // })
    // .addCase(toggleWishlist.fulfilled, (state, action) => {
    //   state.loading = status.SUCCESS;
    //   const productId = action.meta.arg;
    //   const product = state.data.find((product) => product.id === productId);
    //   if (product) {
    //     product.onWishlist = !product.onWishlist;
    //   }
    // })
    // .addCase(toggleWishlist.rejected, (state, action) => {
    //   state.loading = status.FAILED;
    //   state.error = action.error.message;
    // });
  }
});

export default CommentSlice.reducer;
