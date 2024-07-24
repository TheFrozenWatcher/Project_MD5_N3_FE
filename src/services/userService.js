import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../api";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const cookie = new Cookies();
const token = cookie.get("accessToken");

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

