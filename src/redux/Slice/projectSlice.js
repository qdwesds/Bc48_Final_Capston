import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: {},
  projectList: {},
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    putProjectDetail: (state, action) => {
      state.project = action.payload;
    },
    updateProjectList: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { putProjectDetail, updateProjectList } = projectSlice.actions;

export default projectSlice.reducer;
