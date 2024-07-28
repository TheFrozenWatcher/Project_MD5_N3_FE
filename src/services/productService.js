import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";


export const fetchAllProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async ({ keyword, page, size, sortBy, sortDirection }) => {

        const response = await BASE_URL[GET]("admin/product", {
            params: { keyword, page, size, sortBy, sortDirection },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    }
);

export const fetchAllProductsForUsers = createAsyncThunk(
    "product/fetchAllProducts",
    async ({ keyword,categoryId, page, size, sortBy, sortDirection }) => {

        const response = await BASE_URL[GET]("user/product", {
            params: { keyword,categoryId, page, size, sortBy, sortDirection },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    }
);

export const deleteProductById = createAsyncThunk(
    "product/delete",
    async (id) => {
        await BASE_URL[DELETE]('admin/product/' + id + '/delete',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return id;
    }
);

export const fetchProductForm = createAsyncThunk(
    "product/fetchForm",
    async () => {
        const response = await BASE_URL[GET]('admin/product/add', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    }
);

export const createProduct = createAsyncThunk(
    "product/add",
    async (product) => {
        const formData = new FormData();
        formData.append("productName", product.productName);
        formData.append("description", product.description);
        if (product.imageFile) formData.append("imageFile", product.imageFile);
        formData.append("brandId", product.brandId);

        formData.append("categoryId", product.categoryId);
        product.imageFileList.forEach((file) => formData.append("imageFileList", file));
        const response = await BASE_URL[POST]('admin/product/add', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        return response.data;
    }
);

export const updateProduct = createAsyncThunk(
    "product/update",
    async ({ productId, formData }) => {
        try {
            const response = await BASE_URL[PUT](
                `admin/product/${productId}/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", Authorization: `Bearer ${accessToken}`,
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "product/fetchById",
    async (id) => {
        const response = await BASE_URL[GET](`admin/product/${id}/update`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    }
);


export const selectProductById = createAsyncThunk(
    "product/getById",
    async (id) => {
        const response = await BASE_URL[GET](`user/product/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
);

export const toggleWishlist = createAsyncThunk(
    "product/toggleWishlist",
    async (productId) => {

        try {
            const response = await BASE_URL[POST](
                `/user/product/${productId}/wishlist`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);