import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../constants/status";
import {
  fetchProductDetailById,
  createProductDetail,
  updateProductDetail,
  deleteProductDetailById,
  fetchAllProductDetails,
  fetchProductDetailForm
} from "../../services/productDetailService";

const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    loading: status.IDLE,
    data: [],
    productList:[],
    colors:[],
    error: null,
    totalPages:1,
    currentPage:1,
    currentProductDetail: null, // Holds the current product detail data
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all product details by product ID
      .addCase(fetchAllProductDetails.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchAllProductDetails.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.data = action.payload.content || []; // Ensure it's an array
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
        
      })
      .addCase(fetchAllProductDetails.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })
      // Fetch product form (products and colors)
      .addCase(fetchProductDetailForm.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchProductDetailForm.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.productList = action.payload.productList;
        state.colors=action.payload.colorList;
      })
      .addCase(fetchProductDetailForm.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Fetch product detail by ID
      .addCase(fetchProductDetailById.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchProductDetailById.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.currentProductDetail = action.payload;
        console.log("detail: "+action.payload);
      })
      .addCase(fetchProductDetailById.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Create product detail
      .addCase(createProductDetail.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(createProductDetail.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Update product detail
      .addCase(updateProductDetail.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(updateProductDetail.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        const updatedDetail = action.payload;
        state.data = state.data.map((detail) =>
          detail.id === updatedDetail.id ? updatedDetail : detail
        );
      })
      .addCase(updateProductDetail.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Delete product detail by ID
      .addCase(deleteProductDetailById.fulfilled, (state, action) => {
        state.data = state.data.filter((detail) => detail.id !== action.payload);
      });
  }
});

export default ProductDetailSlice.reducer;
