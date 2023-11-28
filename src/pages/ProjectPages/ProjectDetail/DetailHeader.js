import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setUpModal } from "../../../redux/Slice/modalSlice";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import MemberAvatar from "../../../components/Avatar/MemberAvatar";
import CreateTask from "./Tasks/CreateTask";

const DetailHeader = ({ project }) => {
  const dispatch = useDispatch();
  const { modalProps } = useSelector((state) => state.modalSlice);

  const handleModalCreateTask = () => {
    let modalHeader = (
      <div className="header-text capitalize font-semibold text-lg">
        Create Issue
      </div>
    );
    dispatch(
      setUpModal({ ...modalProps, width: "auto", headerContent: modalHeader })
    );
    dispatch(openModal(<CreateTask project={project} />));
  };
  const projectBoardFilter = (
    <div className="project__board-filter mb-4 flex items-center justify-between">
      <div className="col--left flex items-center gap-4">
        <div className="search-bar relative">
          <Input
            className="search-input border-black rounded-none pl-5 py-2"
            type="text"
            name="filter-task-search"
            id="filter-task-search"
          />
          <SearchOutlined className="absolute top-1/2 left-2 z-[1px] -translate-y-1/2" />
        </div>
        <div className="member">
          <Avatar.Group size={30}>
            <MemberAvatar members={project?.members} />
          </Avatar.Group>
        </div>
      </div>
      <div className="col--right">
        <button
          onClick={handleModalCreateTask}
          className="text-base border-none rounded-md font-semibold px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 duration-300"
        >
          Create Task
        </button>
      </div>
    </div>
  );
  return <>{projectBoardFilter}</>;
};

export default DetailHeader;
