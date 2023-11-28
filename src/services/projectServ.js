import https from "./config";
import { AppDispatch } from "../redux/configureStore";
import { setLoadingEnd } from "../redux/Slice/loadingSlice";
import {
  putProjectDetail,
  updateProjectList,
} from "../redux/Slice/projectSlice";
import { message } from "antd";
import thunk from "redux-thunk";

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
  getAllAndDispatch: (successMessage) => {
    return thunk(() => {
      return https
      .get(`/api/Project/getAllProject`)
      .then((res) => {
        AppDispatch(updateProjectList(res.data.content));
        if (successMessage) {
          message.success(successMessage);
        }
        AppDispatch(setLoadingEnd());
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        AppDispatch(setLoadingEnd());
      });
    })
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
  getDetails: async (projectId) => {
    return await https.get(`/api/Project/getProjectDetail?id=${projectId}`);
  },
  getDetailsThunk: async (projectId) => {
    return await https
      .get(`/api/Project/getProjectDetail?id=${projectId}`)
      .then((res) => {
        console.log(res);
        let resContent = res.data.content;
        resContent = {
          ...resContent,
          categoryName: resContent.projectCategory.name,
        };
        AppDispatch(putProjectDetail(resContent));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          AppDispatch(setLoadingEnd());
        }, 1000);
      });
  },
  assignUser: async (projectId, userId) => {
    return await https.post(`/api/Project/assignUserProject`, {projectId, userId})
  },
  deleteMember: async (projectId, userId) => {
    return await https.post(`/api/Project/removeUserFromProject`, {projectId, userId})
  },
};
