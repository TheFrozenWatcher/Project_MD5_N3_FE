import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../api";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const cookie = new Cookies();
const token = cookie.get("accessToken");

export const giveFeedback = createAsyncThunk("user/giveFeedback",async ( formFeedBack,thunkAPI)=>{
   try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/givefeedback",
      formFeedBack,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error);
   }
})

export const getPayHistory = createAsyncThunk("user/getPayHistory",async (thunkAPI) => {
   try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/user/payhistory",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error);
   }
})

export const createOrder = createAsyncThunk("user/createOrder", async ({couponCode, code, addressId},thunkAPI) => {
   try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/payment",
      {couponCode, code, addressId},
      {
        params: {couponCode, code, addressId},
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error);
   }
})


export const getTotalPrice = createAsyncThunk("user/getTotalPrice", async (couponCode,thunkAPI) => {
   try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/user/payment/totalPrice",
      {
        params: {couponCode},
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error);
   }
})

export const getUserAddress = createAsyncThunk("user/getUserAddress", async (thunkAPI) => {
   try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/user/payment/address",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error);
   }
})



export const editUser = createAsyncThunk("user/edituser", async (userEdit) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/api/v1/user/edit",
      userEdit,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const updatePassword = createAsyncThunk(
  "user/changepassword",
  async ({ oldPassword, newPassword, confirmPassword }) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/user/account/change-password",
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (err) {
      alert(err.response.data.content.oldPassword);
    }
  }
);


export const getWishlist = createAsyncThunk("user/getWishlist", async () => {
  const response = await axios.get(
    "http://localhost:8080/api/v1/user/wishlist",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
});

export const deleteWishlist = createAsyncThunk("user/deleteWishlist", async (productId) => {
        const response = await axios.delete(
        `http://localhost:8080/api/v1/user/wishlist/${productId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
})

