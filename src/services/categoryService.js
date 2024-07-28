import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async () => {
    const response = await BASE_URL[GET]('admin/category', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  }
);
// Delete

export const deleteCategoryById = createAsyncThunk(
  "category/delete",
  async (id) => {
    await BASE_URL[DELETE]('admin/category/' + id + '/delete', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return id;
  }
);
// Add
export const createCategory = createAsyncThunk(
  "category/add",
  async (category) => {
    const formData = new FormData();
    formData.append("categoryName", category.categoryName);
    formData.append("description", category.description);
    formData.append("imageFile", category.imageFile);

    const response = await BASE_URL[POST]('admin/category/add', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);
// Update

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ categoryId, formData }) => {
    for (const value of formData.values()) {
      console.log(value);
    }
    try {
      const response = await BASE_URL[PUT](
        "admin/category/" + categoryId + "/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,

          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }
);


export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async (id) => {
    const response = await BASE_URL[GET](`admin/category/${id}/update`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return response.data;
  }
);

export const fetchCategoriesForInput = createAsyncThunk("getCategoryIdInput",
  async () => {
    try {
      const response = await BASE_URL[GET]('user/category/list', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
)