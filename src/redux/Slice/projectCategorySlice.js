import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectCategoryArr: [],
};

const projectCategorySlice = createSlice({
  name: "projectCategorySlice",
  initialState,
  reducers: {
    getAllProjectCategory: (state, action) => {
      state.projectCategoryArr = [...action.payload];
    },
  },
});

export const { getAllProjectCategory } = projectCategorySlice.actions;

export default projectCategorySlice.reducer;
