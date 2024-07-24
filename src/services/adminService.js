
import { createAsyncThunk } from "@reduxjs/toolkit";

import { GET } from "../constants/httpMethod";
import BASE_URL from "../api";

export const getAllUsers = createAsyncThunk("users/getAllUsers",async ({page,size,search,direction})=>{
    const response = await BASE_URL[GET](`admin/user?page=${page}&size=${size}&search=${search}&direction=${direction}`);
    return response.data;
});

export const changeStatus = createAsyncThunk("users/changeStatus",async (id) => {
    const response = await BASE_URL.put(`/admin/user/${id}`);
    return response.data;
});

export const changeRole = createAsyncThunk("users/changeRole",async (id)=>{
const response = await BASE_URL.put(`/admin/user/setrole/${id}`);
});

export const getAllBanners = createAsyncThunk("admin/getAllBanners",async ()=>{
    const response = await BASE_URL[GET](`admin/banner`);
    return response.data;
});

export const addBanner = createAsyncThunk("admin/addBanner", async (formAddBanner) => {
    const response = await BASE_URL.post(`admin/banner`, formAddBanner,{
        headers: {
            'Content-Type': "Multipart/form-data",
        },
    });
    return response.data;
});

export const  deleteBanner = createAsyncThunk("admin/deleteBanner", async (id) => {
    const response = await BASE_URL.delete(`/admin/banner/${id}`);
    return response.data;
});

export const editBanner = createAsyncThunk("admin/editBanner", async (formEditBanner) =>{
    const response = await BASE_URL.put(`admin/banner`, formEditBanner,{
        headers: {
            'Content-Type': "Multipart/form-data",
        },
    });
    return response.data;
});

export const getOrders = createAsyncThunk("admin/getOrders", async () => {
    const response = await BASE_URL[GET](`admin/orders`);
    return response.data;
});