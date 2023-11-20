import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import projectHooks from "../../../../hooks/projectHooks";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { projectServ } from "../../../../services/projectServ";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../../redux/Slice/loadingSlice";
import { updateProjectList } from "../../../../redux/Slice/projectSlice";
import toastify from "../../../../utils/toastify/toastify";
import ProjectButtonAction from "./ProjectButtonAction";

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
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const { projectList } = useSelector((state) => state.projectSlice);
  console.log(projectList);

  useEffect(() => {
    dispatch(setLoadingStart());
    projectServ
      .getAllProject()
      .then((res) => {
        dispatch(updateProjectList(res.data.content));
        dispatch(setLoadingEnd());
      })
      .catch((err) => {
        toastify("error", err.response.data.content);
        dispatch(setLoadingEnd());
      });
  }, []);

  const columns = [
    {
      title: <span className="text-lg">Name</span>,
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",
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
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
    },
    {
      title: <span className="text-lg">Members</span>,
      dataIndex: "members",
      key: "members",
      width: "20%",
    },
    {
      title: <span className="text-lg">Action</span>,
      key: "action",
      render: (text, record, index) => {
        return <ProjectButtonAction/>;
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
        <Button onClick={setAgeSort}>Sort age</Button>
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
