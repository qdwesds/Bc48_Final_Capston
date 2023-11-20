import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocal } from "../../utils/localStorage";

const dataUserLocal = getLocal("user");


const initialState = {
  user: dataUserLocal,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, updateProfile } = userSlice.actions;

export default userSlice.reducer;
