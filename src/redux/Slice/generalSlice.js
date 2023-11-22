import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
  DrawerContent: null,
  sidebarCollapse: false,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    handleDrawerOpen: (state, action) => {
      state.DrawerContent = action.payload;
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    toggleCollapseSidebar: (state) => {
      if (state.sidebarCollapse === true) {
        state.sidebarCollapse = false;
      } else {
        state.sidebarCollapse = true;
      }
    },
    collapseSidebar: (state) => {
      state.sidebarCollapse = true;
    },
  },
});

export const {toggleCollapseSidebar, closeDrawer, collapseSidebar, handleDrawerOpen} = generalSlice.actions;

export default generalSlice.reducer;
