import { createAsyncThunk } from "@reduxjs/toolkit";

import { GET } from "../constants/httpMethod";
import BASE_URL from "../api";
import axios, { AxiosError } from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
export const getSaleRevenue = createAsyncThunk(
  "admin/getSaleRevenue",
  async (year, thunkAPI) => {
    try {
      const response = await BASE_URL[GET](`admin/salerevenue`, {
        params: { year },
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getSoldProducts = createAsyncThunk(
  "admin/getSoldProducts",
  async (year) => {
    try {
      const response = await BASE_URL[GET](`admin/soldproduct`, {
        params: { year },
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getOrderStatistics = createAsyncThunk(
  "admin/getOrderStatistics",
  async (year, thunkAPI) => {
    try {
      const response = await BASE_URL[GET](`admin/orderstatistics`, {
        params: { year },
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ page, size, search, direction, sort }) => {
    const response = await BASE_URL[GET](
      `admin/user?page=${page}&size=${size}&search=${search}&direction=${direction}&sort=${sort}`,
      {
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      }
    );
    return response.data;
  }
);

export const changeStatus = createAsyncThunk(
  "users/changeStatus",
  async (id) => {
    const response = await BASE_URL.put(`/admin/user/${id}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("accessToken"),
      },
    });
    return response.data;
  }
);

export const changeRole = createAsyncThunk("users/changeRole", async (id) => {
  const response = await BASE_URL.put(`/admin/user/setrole/${id}`);
});

export const getAllBanners = createAsyncThunk(
  "admin/getAllBanners",
  async () => {
    const response = await BASE_URL[GET](`admin/banner`, {
      headers: {
        Authorization: "Bearer " + cookie.get("accessToken"),
      },
    });
    return response.data;
  }
);

export const addBanner = createAsyncThunk(
  "admin/addBanner",
  async (formAddBanner) => {
    const response = await BASE_URL.post(`admin/banner`, formAddBanner, {
      headers: {
        "Content-Type": "Multipart/form-data",
        Authorization: "Bearer " + cookie.get("accessToken"),
      },
    });
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  "admin/deleteBanner",
  async (id) => {
    const response = await BASE_URL.delete(`/admin/banner/${id}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("accessToken"),
      },
    });
    return response.data;
  }
);

export const editBanner = createAsyncThunk(
  "admin/editBanner",
  async (formEditBanner) => {
    const response = await BASE_URL.put(`admin/banner`, formEditBanner, {
      headers: {
        "Content-Type": "Multipart/form-data",
        Authorization: "Bearer " + cookie.get("accessToken"),
      },
    });
    return response.data;
  }
);

export const getCoupons = createAsyncThunk("admin/getCoupons", async () => {
  const response = await BASE_URL[GET](`admin/coupon`, {
    headers: {
      Authorization: "Bearer " + cookie.get("accessToken"),
    },
  });
  return response.data;
});

export const addCoupon = createAsyncThunk(
  "admin/addCoupon",
  async (formAddCoupon, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/admin/coupon`,
        formAddCoupon,
        {
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.content);
    }
  }
);
export const deleteCoupon = createAsyncThunk(
  "admin/couponsdelete",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/admin/coupon/${id}`,{
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      }
    );
    return response.data;
  }
);

export const editCoupon = createAsyncThunk(
  "admin/editCoupon",
  async (formEdit, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/coupon`,
        formEdit,{
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.content);
    }
  }
);
export const getEvents = createAsyncThunk("admin/getEvents", async () => {
  const response = await BASE_URL[GET](`admin/event`,{
    headers: {
      Authorization: "Bearer " + cookie.get("accessToken"),
    },
  });
  return response.data;
});

export const addEvent = createAsyncThunk(
  "admin/addEvent",
  async (formAddEvent, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/admin/event`,
        formAddEvent,{
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.content);
    }
  }
);
export const deleteEvent = createAsyncThunk(
  "admin/eventsdelete",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/admin/event/${id}`,{
        headers: {
          Authorization: "Bearer " + cookie.get("accessToken"),
        },
      }
    );
    return response.data;
  }
);

export const editEvent = createAsyncThunk(
  "admin/editEvent",
  async (formEdit, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/event`,
        formEdit,{
          headers: {
            Authorization: "Bearer " + cookie.get("accessToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.content);
    }
  }
);
