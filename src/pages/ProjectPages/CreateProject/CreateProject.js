import React from "react";
import ProjectForm from "../../../components/Form/ProjectForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toastify from "../../../utils/toastify/toastify";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../redux/Slice/loadingSlice";
import { putProjectDetail } from "../../../redux/Slice/projectSlice";
import { projectServ } from "../../../services/projectServ";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnFinish = (values) => {
    dispatch(setLoadingStart());
    const newProject = { ...values };
    if (!values.description) {
      newProject.description = "";
    }
    projectServ
      .createProject(newProject)
      .then((res) => {
        dispatch(putProjectDetail(res.data.content));
        setTimeout(() => {
          navigate("/");
          dispatch(setLoadingEnd());
          toastify("success", "Create project successfully !");
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.content);
          dispatch(setLoadingEnd());
        }, 2500);
      });
  };
  return (
    <div className="createProject container h-full mx-auto px-4">
      <div className="mb-5">
        <h3 className="uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide mb-3 relative">
          Add project-details
        </h3>
        <h6 className="text-base tracking-wider text-[#172B4D]/70 font-medium">
          You can change these details anytime in your project settings.
        </h6>
      </div>
      <ProjectForm
        layout="vertical"
        size="large"
        confirmText="Create Project"
        handleOnFinish={handleOnFinish}
      />
    </div>
  );
};

export default CreateProject;
