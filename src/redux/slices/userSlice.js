import { createSlice } from "@reduxjs/toolkit";
import { FAILED, IDLE, PENDING, SUCCESS } from "../../constants/status";
import { getAllUsers } from "../../api/userAPI";

const userSlice = createSlice({
    name: "user",
    initialState: {
      loading: [IDLE],
      data: null,
      error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(getAllUsers.pending, (state) => {
        state.loading = [PENDING];
      });
  
      builder.addCase(getAllUsers.fulfilled, (state, action) => {
        console.log(action);
        state.data = action.payload;
        state.loading =[SUCCESS];
      });
      builder.addCase(getAllUsers.rejected, (state, action) => {
        state.loading = [FAILED];
        state.error = action.error;
      });
    },
  });
  export default userSlice.reducer;