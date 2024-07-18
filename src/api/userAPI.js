
import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from ".";
import { GET } from "../constants/httpMethod";

export const getAllUsers = createAsyncThunk("users/getAllUsers",async ()=>{
    const response = await BASE_URL[GET]("admin/user");
    return response.data;
});