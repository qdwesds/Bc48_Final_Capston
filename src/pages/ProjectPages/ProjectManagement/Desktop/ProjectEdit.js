import React from "react";
import { projectServ } from "../../../../services/projectServ";
import { closeDrawer } from "../../../../redux/Slice/generalSlice";
import toastify from "../../../../utils/toastify/toastify";
import { useDispatch } from "react-redux";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../../redux/Slice/loadingSlice";
import ProjectForm from "../../../../components/Form/ProjectForm";

const ProjectEdit = ({ project }) => {
  const dispatch = useDispatch();
  const handleOnFinish = (values) => {
    dispatch(setLoadingStart());
    const updateProject = {
      ...values,
      id: project.id,
      creator: project.creator.id,
    };
    projectServ
      .updateProject(project.id, updateProject)
      .then((res) => {
        toastify("success", "Updated project successfully!");
        dispatch(closeDrawer());
        setTimeout(() => {
          dispatch(projectServ.getAllAndDispatch(null));
          dispatch(setLoadingEnd());
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.message);
          dispatch(setLoadingEnd());
        }, 2500);
      });
  };
  return (
    <div className="container py-10 text-[#172B4D]">
      <h3 className="mb-5 uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide">
        edit project
      </h3>
      <ProjectForm
        layout="vertical"
        size="large"
        project={project}
        confirmText="Update Project"
        handleOnFinish={handleOnFinish}
      />
    </div>
  );
};

export default ProjectEdit;
