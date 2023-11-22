import { Popconfirm, Space, Tooltip, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { projectServ } from "../../../../services/projectServ";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../../redux/Slice/loadingSlice";
import { handleDrawerOpen } from "../../../../redux/Slice/generalSlice";
import ProjectEdit from "./ProjectEdit";
import { updateProjectList } from "../../../../redux/Slice/projectSlice";
import toastify from "../../../../utils/toastify/toastify";

const ProjectButtonAction = ({ project }) => {
  const dispatch = useDispatch();
  const handleEditProject = (project) => {
    dispatch(handleDrawerOpen(<ProjectEdit project={project}/>));
  };
  const handleDeleteProject = () => {
    dispatch(setLoadingStart());
    projectServ
      .deleteProject(project.id)
      .then((res) => {
        toastify("success", "Deleted project successfully!")
        dispatch(updateProjectList());
        dispatch(setLoadingEnd());
      })
      .catch((err) => {
        message.error(err.response.data.content);
        dispatch(setLoadingEnd());
      });
  };
  return (
    <Space size={"middle"}>
      <Tooltip title="Edit Project">
        <button
          onClick={() => {
            handleEditProject(project);
          }}
        >
          <span className="p-2 rounded inline-flex justify-center items-center bg-cyan-500 hover:bg-cyan-400 text-xl text-white transition duration-300 cursor-pointer">
            <FormOutlined />
          </span>
        </button>
      </Tooltip>
      <Popconfirm
        title={
          <span className="text-lg pl-1">
            Are you sure to delete{" "}
            <span className="font-semibold">{project.projectName}</span>?
          </span>
        }
        onConfirm={handleDeleteProject}
        okText="Yes"
        okButtonProps={{
          danger: true,
          type: "default",
          size: "large",
          className: "btn-delete-ok",
        }}
        cancelText="No"
        cancelButtonProps={{
          type: "primary",
          size: "large",
          className: "btn-delete-cancel",
        }}
        icon={
          <QuestionCircleOutlined className="pt-1.5 text-red-500 text-xl" />
        }
      >
        <Tooltip title="Delete Project">
          <span className="p-2 rounded inline-flex justify-center items-center bg-red-500 hover:bg-red-600 text-xl text-white transition duration-300 cursor-pointer">
            <DeleteOutlined />
          </span>
        </Tooltip>
      </Popconfirm>
    </Space>
  );
};

export default ProjectButtonAction;
