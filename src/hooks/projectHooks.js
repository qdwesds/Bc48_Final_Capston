import { useEffect } from "react";
import { projectServ } from "../services/projectServ";
import { AppDispatch } from "../redux/configureStore";
import { updateProjectList } from "../redux/Slice/projectSlice";
import { message } from "antd";
import { setLoadingEnd, setLoadingStart } from "../redux/Slice/loadingSlice";

const projectHooks = {
  useFetchProjectList: (successMessage) => {
    useEffect(() => {
      AppDispatch(setLoadingStart());
      projectServ
        .getAllProject()
        .then((res) => {
          AppDispatch(updateProjectList(res.data.content));
          if (successMessage) {
            message.success(successMessage);
          }
          AppDispatch(setLoadingEnd());
        })
        .catch((err) => {
          message.error(err.response.data.content);
          AppDispatch(setLoadingEnd());
        });
    }, []);
  },
};

export default projectHooks;
