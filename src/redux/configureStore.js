import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import generalSlice from "./Slice/generalSlice";
import loadingSlice from "./Slice/loadingSlice";
import projectCategorySlice from "./Slice/projectCategorySlice";
import projectSlice from "./Slice/projectSlice";
import modalSlice from "./Slice/modalSlice";
import taskSlice
 from "./Slice/taskSlice";
import thunk from "redux-thunk";
export const store = configureStore({
  reducer: {
    userSlice,
    generalSlice,
    loadingSlice,
    projectCategorySlice,
    projectSlice,
    modalSlice,
    taskSlice,
  },
  middleware: [thunk]
});

export const AppDispatch =  store.dispatch;
