import { useEffect } from "react";
import { projectServ } from "../services/projectServ";
import { updateProjectList } from "../redux/Slice/projectSlice";
import toastify from "../utils/toastify/toastify";
import { setLoadingEnd, setLoadingStart } from "../redux/Slice/loadingSlice";

const projectHooks = {
  useFetchProjectList: (dispatch, successMessage) => {
    useEffect(() => {
      dispatch(setLoadingStart());
      projectServ
        .getAllProject()
        .then((res) => {
          let data = res.data.content.map((project) => {
            return { ...project };
          });
          dispatch(updateProjectList(data));
          if (successMessage) {
            toastify("success", successMessage);
          }
          dispatch(setLoadingEnd());
        })
        .catch((err) => {
          toastify("error", err.response.data.content);
          dispatch(setLoadingEnd());
        });
    }, []);
  },
};

export default projectHooks;
