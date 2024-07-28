import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";


// Fetch all comments by product
export const fetchAllMessages = createAsyncThunk(
  'message/fetchAll',
  async () => {
    try {
      const response = await BASE_URL[GET](`user/message`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Throw the error to be caught by `createAsyncThunk`
    }
  }
);

// Get user comment on a product
export const fetchUnreadMessageCount = createAsyncThunk(
  'message/fetchUnreadCommentCount',
  async () => {

    try {
      const response = await BASE_URL[GET](`user/message/countUnread`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);


// Read all messages
export const setMessageStatus = createAsyncThunk(
  'message/read',
  async () => {
    const response = await BASE_URL[PUT](`user/message/markAsRead/${accessToken}`,{params:{accessToken}} ,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
);

