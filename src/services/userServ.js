import https from "./config";

export const userServ = {
  login: async (loginData) => {
    return await https.post(`/api/Users/signin`, loginData);
  },
  register: async (registerData) => {
    return await https.post(`/api/Users/signup`, registerData);
  },
  getAllUser: async () => {
    return await https.get(`/api/Users/getUser`);
  },
  deleteUser: async (userId) => {
    return await https.delete(`/api/Users/deleteUser?id=${userId}`);
  },
  editUser: async (userEdit) => {
    return await https.put(`/api/Users/editUser`, userEdit);
  },
  editProfile: async (userInfo) => {
    return await https.put(`/api/Users/editUser`, userInfo);
  }
};
