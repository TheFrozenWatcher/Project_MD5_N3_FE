import { createAsyncThunk } from "@reduxjs/toolkit";

import { GET, PUT, DELETE } from "../constants/httpMethod";
import BASE_URL from "../api";
import axios, { AxiosError } from "axios";

export const getOrders = createAsyncThunk("admin/getOrders", async () => {
    const response = await BASE_URL[GET](`admin/orders`);
    return response.data;
});