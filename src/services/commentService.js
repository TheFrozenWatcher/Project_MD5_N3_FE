import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";


// Fetch all comments by product
export const fetchAllCommentsByProduct = createAsyncThunk(
  'comment/fetchAllCommentsByProduct',
  async (id) => {
    try {
      const response = await BASE_URL[GET](`user/product/${id}/comment`, {
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
export const fetchUserComment = createAsyncThunk(
  'comment/fetchUserComment',
  async (id) => {

    try {
      const response = await BASE_URL[GET](`user/product/${id}/comment`, {
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


// Create comment
export const createComment = createAsyncThunk(
  'comment/create',
  async (comment) => {

    try {
      const response = await BASE_URL[POST](`user/comment/addComment`, comment, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }
);

export const createCommentDetail = createAsyncThunk(
  'comment/create',
  async (formData) => {
    try {
      const response = await BASE_URL[POST](`user/comment/addCommentDetail/${formData.commentId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }
);

// Update comment
export const updateComment = createAsyncThunk(
  "comment/update",
  async (comment) => {
    try {
      const response = await BASE_URL[PUT](
        `user/comment/updateComment/${comment.commentId}`,
        comment,
        { headers: {  Authorization: `Bearer ${accessToken}` } }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  }
);

export const updateCommentDetail = createAsyncThunk(
  "comment/update",
  async ( commentDetail) => {
console.log(commentDetail);
    try {
      const response = await BASE_URL[PUT](
        `user/comment/updateCommentDetail/${commentDetail.commentDetailId}`,
        commentDetail,
        { headers: {  Authorization: `Bearer ${accessToken}` } }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  }
);

// Fetch comment by ID
export const fetchCommentById = createAsyncThunk(
  "comment/fetchById",
  async (id) => {

    try {
      const response = await BASE_URL[GET](`user/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching comment by ID:", error);
      throw error;
    }
  }
);

// Toggle comment visibility
export const toggleComment = createAsyncThunk(
  "comment/toggleVisibility",
  async (commentId, thunkAPI) => {
    console.log(commentId);
    try {
      const response = await BASE_URL[PUT](
        `/admin/comment/toggleComment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const toggleCommentDetail = createAsyncThunk(
  "commentDetail/toggleVisibility",
  async (commentId, thunkAPI) => {

    try {
      const response = await BASE_URL[PUT](
        `/admin/comment/toggleCommentDetail/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete comment
export const deleteCommentById = createAsyncThunk(
  "comment/delete",
  async (commentId, thunkAPI) => {

    try {
      const response = await BASE_URL[DELETE](
        `/user/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCommentDetail = createAsyncThunk(
  "comment/delete",
  async (commentId, thunkAPI) => {

    try {
      const response = await BASE_URL[DELETE](
        `/user/comment/commentDetail/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


