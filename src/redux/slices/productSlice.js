import { createSlice } from "@reduxjs/toolkit";
import * as status from "../../constants/status";
import {
  createProduct,
  deleteProductById,
  fetchAllProducts,
  fetchProductForm,
  updateProduct,
  fetchProductById
} from "../../services/productService";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    loading: status.IDLE,
    data: [],
    error: null,
    brands: [],
    categories: [],
    totalPages: 1,
    currentProduct: null, // Holds the current product data
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.data = action.payload.products || []; // Ensure it's an array
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Delete product by ID
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.data = state.data.filter((pro) => pro.id !== action.payload);
      })

      // Fetch product form (brands and categories)
      .addCase(fetchProductForm.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchProductForm.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.brands = action.payload.brandList;
        state.categories = action.payload.categoryList;
      })
      .addCase(fetchProductForm.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        const updatedProduct = action.payload;
        state.data = state.data.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = status.PENDING;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = status.SUCCESS;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = status.FAILED;
        state.error = action.error.message;
      });
  }
});

export default ProductSlice.reducer;
