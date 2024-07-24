import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { addEvent, getEvents } from "../../services/adminService";

const eventSlice = createSlice({
  name: "admin",
  initialState: {
    loading: [IDLE],
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state) => {
      state.loading = [PENDING];
    });

    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = [SUCCESS];
    });
    builder.addCase(getEvents.rejected, (state, action) => {
      state.loading = [FAILED];
      state.error = action.error;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.loading = [SUCCESS];
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.loading = [FAILED];
      state.error = action.payload;
      console.log(action);
      console.log(state.error);
    });
  },
});
export default eventSlice.reducer;
