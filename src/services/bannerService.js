import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import axios from "axios";

export const displayBanner = createAsyncThunk("permitAll/displayBanner",async (thunkAPI)=>{
    try{
        const response = await axios.get("http://localhost:8080/api/v1/banner/getbanners")
        return response.data
    } catch(error){
        return thunkAPI.rejectWithValue(error.response.data.content);

    }
})