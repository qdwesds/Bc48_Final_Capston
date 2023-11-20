import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setLoadingStart: (state) => {
      state.isLoading = true;
    },
    setLoadingEnd: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingStart, setLoadingEnd } = loadingSlice.actions;

export default loadingSlice.reducer;
