import React from "react";
import { Table } from "antd";

const UserTable = ({ userList }) => {
  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <span className="text-red-500 font-medium">{text}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return <Table columns={columns} dataSource={userList} />;
};

export default UserTable;
