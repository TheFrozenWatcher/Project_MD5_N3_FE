import { createAsyncThunk } from "@reduxjs/toolkit";

import { GET } from "../constants/httpMethod";
import BASE_URL from "../api";
import axios, { AxiosError } from "axios";


export const getOrderStatistics = createAsyncThunk("admin/getOrderStatistics", async (year, thunkAPI) =>{
  try{
    const response = await BASE_URL[GET](`admin/orderstatistics`,{
      params: {year}
    });
    return response.data;
  } catch(err){
    return thunkAPI.rejectWithValue(err);
  }
})


export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ page, size, search, direction }) => {
    const response = await BASE_URL[GET](
      `admin/user?page=${page}&size=${size}&search=${search}&direction=${direction}`
    );
    return response.data;
  }
);

export const changeStatus = createAsyncThunk(
  "users/changeStatus",
  async (id) => {
    const response = await BASE_URL.put(`/admin/user/${id}`);
    return response.data;
  }
);

export const changeRole = createAsyncThunk("users/changeRole", async (id) => {
  const response = await BASE_URL.put(`/admin/user/setrole/${id}`);
});

export const getAllBanners = createAsyncThunk(
  "admin/getAllBanners",
  async () => {
    const response = await BASE_URL[GET](`admin/banner`);
    return response.data;
  }
);

export const addBanner = createAsyncThunk(
  "admin/addBanner",
  async (formAddBanner) => {
    const response = await BASE_URL.post(`admin/banner`, formAddBanner, {
      headers: {
        "Content-Type": "Multipart/form-data",
      },
    });
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  "admin/deleteBanner",
  async (id) => {
    const response = await BASE_URL.delete(`/admin/banner/${id}`);
    return response.data;
  }
);

export const editBanner = createAsyncThunk(
  "admin/editBanner",
  async (formEditBanner) => {
    const response = await BASE_URL.put(`admin/banner`, formEditBanner, {
      headers: {
        "Content-Type": "Multipart/form-data",
      },
    });
    return response.data;
  }
);


export const getCoupons = createAsyncThunk("admin/getCoupons", async () => {
  const response = await BASE_URL[GET](`admin/coupon`);
  return response.data;
});

export const addCoupon = createAsyncThunk(
  "admin/addCoupon",
  async (formAddCoupon, thunkAPI) => {
    try{
        const response = await axios.post(
        `http://localhost:8080/api/v1/admin/coupon`,
        formAddCoupon
      );
      return response.data;
    } catch (error){
        return thunkAPI.rejectWithValue(error.response.data.content);
    }
  }
);
export const deleteCoupon = createAsyncThunk("admin/couponsdelete", async(id) => {
    const response = await axios.delete(`http://localhost:8080/api/v1/admin/coupon/${id}`);
    return response.data;
})

export const editCoupon = createAsyncThunk("admin/editCoupon", async (formEdit,thunkAPI) =>{
  try{
    const response = await axios.put(
        `http://localhost:8080/api/v1/admin/coupon`,
        formEdit
      );
      return response.data;
    } catch (error){
        return thunkAPI.rejectWithValue(error.response.data.content);
  
  }
})
export const getEvents = createAsyncThunk("admin/getEvents", async () => {
  const response = await BASE_URL[GET](`admin/event`);
  return response.data;
});

export const addEvent = createAsyncThunk(
  "admin/addEvent",
  async (formAddEvent, thunkAPI) => {
    try{
        const response = await axios.post(
        `http://localhost:8080/api/v1/admin/event`,
        formAddEvent
      );
      return response.data;
    } catch (error){
        return thunkAPI.rejectWithValue(error.response.data.content);
    }
  }
);
export const deleteEvent = createAsyncThunk("admin/eventsdelete", async(id) => {
    const response = await axios.delete(`http://localhost:8080/api/v1/admin/event/${id}`);
    return response.data;
})

export const editEvent = createAsyncThunk("admin/editEvent", async (formEdit,thunkAPI) =>{
  try{
    const response = await axios.put(
        `http://localhost:8080/api/v1/admin/event`,
        formEdit
      );
      return response.data;
    } catch (error){
        return thunkAPI.rejectWithValue(error.response.data.content);
  
  }
})