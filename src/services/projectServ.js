import https from "./config";

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
};
