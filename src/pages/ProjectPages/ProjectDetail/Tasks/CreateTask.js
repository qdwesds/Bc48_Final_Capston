import React from "react";
import TaskForm from "./TaskForm";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../redux/Slice/modalSlice";
import {
  setLoadingEnd,
  setLoadingStart,
} from "./../../../../redux/Slice/loadingSlice";
import { taskServ } from "./../../../../services/taskServ";
import toastify from './../../../../utils/toastify/toastify'
import { projectServ } from "../../../../services/projectServ";

const CreateTask = ({ project }) => {
  const dispatch = useDispatch();
  const handleOnFinish = (values) => {
    dispatch(closeModal());
    dispatch(setLoadingStart());
    taskServ
      .createTask(values)
      .then((res) => {
        console.log(res);
        toastify("success", res.message);
        dispatch(projectServ.getDetailsThunk(project.id));
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          toastify("error", err.response.data.message);
          dispatch(setLoadingEnd());
      }, 2500);
      });
  };
  return (
    <div className="form-wrapper min-w-full">
      <div className="form-body">
        <TaskForm
          layout="vertical"
          size="large"
          project={project}
          buttonText="create task"
          handleOnFinish={handleOnFinish}
        />
      </div>
    </div>
  );
};

export default CreateTask;
