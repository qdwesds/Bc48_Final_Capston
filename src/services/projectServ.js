import https from "./config";
import { message } from "antd";
import { updateProjectList } from "../redux/Slice/projectSlice";
import { setLoadingEnd } from "../redux/Slice/loadingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/configureStore";

export const projectServ = {
  createProject: async (projectInfo) => {
    return await https.post(`/api/Project/createProjectAuthorize`, projectInfo);
  },
  getAllProjectCategory: async () => {
    return await https.get(`/api/ProjectCategory`);
  },
  getAllProject: async () => {
    return await https.get(`/api/Project/getAllProject`);
  },
  getProjectDetail: async (projectId) => {
    return await https.get(`/api/Project/getProjectDetail?id=${projectId}`);
  },
  deleteProject: async (projectId) => {
    return await https.delete(
      `/api/Project/deleteProject?projectId=${projectId}`
    );
  },
  updateProject: async (projectId, updateInfo) => {
    return await https.put(
      `/api/Project/updateProject?projectId=${projectId}`,
      updateInfo
    );
  },
};
