import { createAsyncThunk } from "@reduxjs/toolkit";

import { GET, PUT, DELETE } from "../constants/httpMethod";
import BASE_URL from "../api";

export const fetchOrders = createAsyncThunk("order/fetchOrders",
    async ({ page, pageSize, sortField, sortDirection }) => {
        try {
            const response = await BASE_URL[GET](`admin/orders?page=${page}&size=${pageSize}&sortField=${sortField}&sortDirection=${sortDirection}`);
            return response.data;
        } catch (error) {
            throw error;
        }
});

export const fetchOrderDetail= createAsyncThunk("order/findOrderById",
    async (orderId) => {
        try {
            const response = await BASE_URL[GET](`admin/orders/${orderId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
});

export const changeOrderStatus = createAsyncThunk(
    "order/changeOrderStatus",
    async ({ orderId, status }) => {
      try {
        const response = await BASE_URL.put(`/admin/orders/${orderId}?status=${status}`);
        return { orderId, status, order: response.data };
      } catch (error) {
        throw error;
      }
    }
  );
  