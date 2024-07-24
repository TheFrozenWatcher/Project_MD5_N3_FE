import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { Cookies } from "react-cookie";

export const fetchAllCommentsByProduct = createAsyncThunk(
    'comment/fetchAllCommentsByProduct',
    async (id) => {
      const cookie = new Cookies();
      const token = cookie.get('accessToken');
  
      try {
        const response = await BASE_URL[GET](`user/product/${id}/comment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data); // Log the response data for debugging
        return response.data;
      } catch (error) {
        console.error(error); // Log the error for debugging
        throw error; // Throw the error to be caught by `createAsyncThunk`
      }
    }
  );

//   Get user commet on a product
  export const fetchUserComment = createAsyncThunk(
    'comment/fetchUserComment',
    async (id) => {
      const cookie = new Cookies();
      const token = cookie.get('accessToken');
      
      try {
        const response = await BASE_URL[GET](`user/product/${id}/comment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data; // Adjust based on your API response structure
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );



export const deleteCommentById = createAsyncThunk(
    "comment/delete",
    async (id) => {
        await BASE_URL[DELETE]('user/comment/' + id);
        return id;
    }
);


export const createComment = createAsyncThunk(
    // "comment/add",
    // async (comment) => {
    //     const formData = new FormData();
    //     formData.append("productName", product.productName);
    //     formData.append("description", product.description);
    //     if (product.imageFile) formData.append("imageFile", product.imageFile);
    //     formData.append("brandId", product.brandId);

    //     formData.append("categoryId", product.categoryId);
    //     product.imageFileList.forEach((file) => formData.append("imageFileList", file));
    //     const response = await BASE_URL[POST]('admin/product/add', formData, {
    //         headers: { "Content-Type": "multipart/form-data" },
    //     });
    //     return response.data;
    // }
);

export const updateComment = createAsyncThunk(
    "product/update",
    async ({ productId, formData }) => {
        try {
            const response = await BASE_URL[PUT](
                `admin/product/${productId}/update`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }
);

export const fetchCommentById = createAsyncThunk(
    "product/fetchById",
    async (id) => {
        const response = await BASE_URL[GET](`admin/product/${id}/update`);
        console.log(response.data);
        return response.data;
    }
);

export const toggleComment = createAsyncThunk(
    "product/toggleWishlist",
    async (productId, thunkAPI) => {
        const cookie = new Cookies();
        const token = cookie.get("accessToken");

        try {
            const response = await BASE_URL[POST](
                `/user/product/${productId}/wishlist`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);