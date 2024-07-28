import { createSlice, current } from "@reduxjs/toolkit";
import * as status from "../../constants/status";
import { createCategory, deleteCategoryById, fetchAllCategories, fetchCategoriesForInput } from "../../services/categoryService";


const CategorySlice = createSlice({
  name: "category",
  initialState: {
    loading: status.IDLE,
    data: [],
    error: null,
    categories:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý các tác vụ bất đồng bộ
    // Trạng thái chờ tải dữ liệu
    builder.addCase(fetchAllCategories.pending, (state, action) => {
      state.loading = status.PENDING;
    });

    // Trạng thái lấy dữ liệu thành công
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading = status.SUCCESS;
      state.data = action.payload.content;
    });

    // Xóa thông tin một bản ghi theo id
    builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
      // Lọc ra những bản ghi có id khác với id cần xóa
      state.data = state.data.filter((cat) => cat.id !== action.payload);
    });
    // Add category

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    // Catch errors
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // Failed to retrieve data
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading = status.FAILED;
      state.error = action.error.message;
    });
    // Fetch categories for input purposes
    builder.addCase(fetchCategoriesForInput.pending, (state) => {
      state.loading = status.PENDING;
    });

    builder.addCase(fetchCategoriesForInput.fulfilled, (state, action) => {
      state.loading = status.SUCCESS;
      state.categories = action.payload; // Adjusted to fit your initial code's structure
    });

    builder.addCase(fetchCategoriesForInput.rejected, (state, action) => {
      state.loading = status.FAILED;
      state.error = action.error.message;
    });
  },
});

export default CategorySlice.reducer;