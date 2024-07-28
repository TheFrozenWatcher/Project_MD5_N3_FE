import { createSlice } from "@reduxjs/toolkit";
import { fetchAllMessages, fetchUnreadMessageCount, setMessageStatus } from "../../services/messageService";

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchUnreadMessageCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
        state.loading = false;
      })
      .addCase(setMessageStatus.fulfilled, (state, action) => {
        state.unreadCount = 0;
        state.loading = false;
      })
      .addCase(fetchAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnreadMessageCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(setMessageStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(fetchUnreadMessageCount.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(setMessageStatus.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  }
});

export default messageSlice.reducer;
