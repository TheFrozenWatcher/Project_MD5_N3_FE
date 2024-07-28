import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { Cookies } from "react-cookie";


export const fetchAllCartItems = createAsyncThunk(
    "cart/getAllItems",
    async () => {
        const cookie = new Cookies();
        const token = cookie.get("accessToken");

        const response = await BASE_URL[GET]("user/cart", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }
);


export const deleteCartById = createAsyncThunk(
    "cart/deleteById",
    async (id) => {
        await BASE_URL[DELETE]('user/cart/' + id);
        return id;
    }
);


export const deleteAllCart = createAsyncThunk(
  "cart/deleteAll",
  async () => {
    const cookie = new Cookies();
    const token = cookie.get("accessToken");

    const response = await BASE_URL[DELETE]("user/cart/clearAll", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
);

export const addToCart = createAsyncThunk(
    "cart/add",
    async (cart) => {
        const cookie = new Cookies();
        const token = cookie.get("accessToken");
        const formData = new FormData();
        formData.append("productDetailId", cart.productDetailId);
        formData.append("quantity", cart.quantity);

        const response = await BASE_URL[POST]('user/cart/add', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const updateCart = createAsyncThunk(
    "cart/update",
    async ({ productDetailId, quantity }) => {
      const cookie = new Cookies();
      const token = cookie.get("accessToken");
      const formData = new FormData();
      formData.append("productDetailId", productDetailId);
      formData.append("quantity", quantity);
  
      try {
        const response = await BASE_URL[PUT](
          `user/cart/update`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return { productDetailId: formData.productDetailId, quantity: formData.quantity };
      } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
      }
    }
  );
  

