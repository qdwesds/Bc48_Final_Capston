import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import generalSlice from "./Slice/generalSlice";
import loadingSlice from "./Slice/loadingSlice";
import projectCategorySlice from "./Slice/projectCategorySlice";
import projectSlice from "./Slice/projectSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    generalSlice,
    loadingSlice,
    projectCategorySlice,
    projectSlice,
  },
});
