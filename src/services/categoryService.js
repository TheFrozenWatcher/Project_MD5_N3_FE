import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async () => {
    const response = await BASE_URL[GET]('admin/category');
    console.log(response.data);
    return response.data;
  }
);

export const deleteCategoryById = createAsyncThunk(
  "category/delete",
  async (id) => {
    await BASE_URL[DELETE]('admin/category/' + id + '/delete');
    return id;
  }
);

export const createCategory = createAsyncThunk(
  "category/add",
  async (category) => {
    const formData = new FormData();
    formData.append("categoryName", category.categoryName);
    formData.append("description", category.description);
    formData.append("imageFile", category.image);
    for (const value of formData.values()) {
      console.log(value);
    } 
    const response = await BASE_URL[POST]('admin/category/add', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ categoryId, category }) => {
    const formData = new FormData();
    formData.append("id", categoryId);
    formData.append("categoryName", category.categoryName);
    formData.append("description", category.description);
    formData.append("image", category.image);
    formData.append("imageFile", category.imageFile)

    const response = await BASE_URL[PUT](`admin/category/${categoryId}/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async (id) => {
    const response = await BASE_URL[GET](`admin/category/${id}/update`);
    return response.data;
  }
);