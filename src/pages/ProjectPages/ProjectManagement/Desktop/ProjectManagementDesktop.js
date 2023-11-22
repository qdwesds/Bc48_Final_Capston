import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProjectButtonAction from "./ProjectButtonAction";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../../redux/Slice/loadingSlice";
import { projectServ } from "../../../../services/projectServ";
import { updateProjectList } from "../../../../redux/Slice/projectSlice";

const ProjectManagementDesktop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setNameSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const { projectList } = useSelector((state) => state.projectSlice);

  useEffect(() => {
    dispatch(setLoadingStart());
    projectServ
      .getAllProject()
      .then((res) => {
        dispatch(updateProjectList(res.data.content));
        dispatch(setLoadingEnd());
      })
      .catch((err) => {
        message.error(err.response.data.content);
        dispatch(setLoadingEnd());
      });
  }, []);

  const columns = [
    {
      title: <span className="text-lg">Name</span>,
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",
      render: (projectName, project) => {
        return (
          <span
            key={project.id}
            className="projectName text-lg font-semibold cursor-pointer hover:text-red-500 duration-300"
            onClick={() => {
              window.location.href = `/project-detail/${project.id}`;
            }}
          >
            {projectName}
          </span>
        );
      },
    },
    {
      title: <span className="text-lg">Category</span>,
      dataIndex: "categoryName",
      key: "categoryName",
      width: "20%",
    },
    {
      title: <span className="text-lg">Creator</span>,
      key: "creator",
      width: "20%",
      render: (record) => {
        return (
          <Tag key={record.creator.id} color="green">
            {record.creator.name}
          </Tag>
        );
      },
    },
    {
      title: <span className="text-lg">Members</span>,
      dataIndex: "members",
      key: "members",
      width: "20%",
      render: (members) => {
        return (
          <>
            {members.map((member) => {
              return (
                <Tag key={member.userId} color="blue">
                  {member.name}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: <span className="text-lg">Action</span>,
      key: "action",
      render: (project) => {
        return <ProjectButtonAction project={project} />;
      },
    },
  ];
  return (
    <>
      <div className="mb-2 flex justify-between items-center container mx-auto px-4">
        <h3 className="uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide">
          project management
        </h3>
        <button
          className="text-lg text-white font-bold tracking-wide px-5 py-2.5 rounded-md bg-red-500 hover:bg-red-600 focus:ring-red-300 duration-200"
          onClick={() => {
            navigate("create-project");
          }}
        >
          Create Project
        </button>
      </div>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setNameSort}>Sort name</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </>
  );
};

export default ProjectManagementDesktop;
