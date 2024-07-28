import { createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api";
import { DELETE, GET, POST, PUT } from "../constants/httpMethod";
import { accessToken } from "../constants/accessToken";


// Fetch all reviews by product
export const fetchAllReviewsByProductDetailId = createAsyncThunk(
  'comment/fetchAllReviewsByProduct',
  async (id) => {
    try {
      const response = await BASE_URL[GET](`user/review/${id}`, {
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



// Delete review by ID
export const deleteReviewById = createAsyncThunk(
  "comment/delete",
  async (id) => {
    await BASE_URL[DELETE](`user/review/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return id;
  }
);

// Create review
export const createReview = createAsyncThunk(
  'review/create',
  async (review) => {
    try {
      const response = await BASE_URL[POST](`user/review/add`, review, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  }
);

// Update review
export const updateReview = createAsyncThunk(
  "review/update",
  async (review) => {

    try {
      const response = await BASE_URL[PUT](
        `user/review/update/${review.reviewId}`,
        review,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating feedback:", error);
      throw error;
    }
  }
);


// Toggle review visibility
export const toggleReview = createAsyncThunk(
  'review/toggleVisibility',
  async (reviewId, thunkAPI) => {
    try {
      const response = await BASE_URL[PUT](
        `/admin/review/toggleReview/${reviewId}`,
        {},
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



