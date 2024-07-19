import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";

export const fetchAllProducts = createAsyncThunk(
    "category/fetchAllProducts",
    async () => {
        const response = await BASE_URL[GET]('admin/product');
        console.log(response.data);
        return response.data;
    }
);
// Delete

export const deleteProductById = createAsyncThunk(
    "product/delete",
    async (id) => {
        await BASE_URL[DELETE]('admin/product/' + id + '/delete');
        return id;
    }
);
// Add
export const createProduct = createAsyncThunk(
    "product/add",
    async (product) => {
        const formData = new FormData();
        formData.append("categoryName", product.productName);
        formData.append("description", product.description);
        formData.append("imageFile", product.imageFile);
        formData.append("brandId", product.brandId);
        formData.append("categoryId", product.categoryId);
        formData.append("imageFileList", product.imageFileList);

        const response = await BASE_URL[POST]('admin/product/add', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
);
// Update

export const updateProduct = createAsyncThunk(
    "category/update",
    async ({ productId, formData }) => {
        for (const value of formData.values()) {
            console.log(value);
        }
        try {
            const response = await BASE_URL[PUT](
                "admin/product/" + productId + "/update",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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
        const response = await BASE_URL[GET](`admin/product/${id}/update`);
        return response.data;
    }
);