import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";

// Fetch all product details by product ID
export const fetchAllProductDetails = createAsyncThunk(
    "productDetails/fetchAllProductDetails",
    async ({ keyword, page, size, sortBy, sortDirection }) => {

        const response = await BASE_URL[GET]("admin/productDetail", {
            params: { keyword, page, size, sortBy, sortDirection },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    }
);

// Fetch a specific product detail by ID
export const fetchProductDetailById = createAsyncThunk(
    "productDetail/fetchById",
    async (detailId) => {
        const response = await BASE_URL[GET](`admin/productDetail/${detailId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
);

// Open form
export const fetchProductDetailForm = createAsyncThunk(
    "product/fetchForm",
    async () => {
        const response = await BASE_URL[GET]('admin/productDetail/request', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    }
);

// Create a new product detail
export const createProductDetail = createAsyncThunk(
    "productDetail/create",
    async (productDetail) => {

        const response = await BASE_URL[POST](`admin/productDetail/add`, productDetail, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',

            },
        });

        return response.data;
    }
);

// Update an existing product detail
export const updateProductDetail = createAsyncThunk(
    "productDetail/update",
    async ({ detailId, productDetail }) => {
        const formData = new FormData();
        formData.append("productDetailId", detailId);
        formData.append('productDetailName', productDetail.productDetailName);
        formData.append('colorId', productDetail.colorId);
        formData.append('stock', productDetail.stock);
        formData.append('unitPrice', productDetail.unitPrice);
        formData.append('productId', productDetail.productId);
        if (productDetail.imageFile) {
            formData.append('imageFile', imageFile);
        }

        const response = await BASE_URL[PUT](`admin/productDetail/${detailId}/update`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);

// Delete a product detail by ID
export const deleteProductDetailById = createAsyncThunk(
    "productDetail/delete",
    async (detailId) => {
        await BASE_URL[DELETE](`admin/productDetail/${detailId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return detailId;
    }
);
