import React, { useState } from "react";
import { Popconfirm, Space, Modal } from "antd";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { userServ } from "./../../../services/userServ";
import toastify from "./../../../utils/toastify/toastify";
import UserEditModal from "./UserEditModal";

const UserActions = ({ user, fetchUserList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const cancelModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Space size={"middle"}>
        <button onClick={openModal}>
          <FormOutlined className="text-blue-500 text-2xl" />
        </button>
        <Modal
          title="Update information"
          open={isModalOpen}
          onCancel={cancelModal}
          footer={null}
          
        >
          <UserEditModal user={user} fetchUserList={fetchUserList}/>
        </Modal>
        <Popconfirm
          title={
            <span className="text-lg pl-1">
              Are you sure you want to delete this user?
            </span>
          }
          onConfirm={() => {
            userServ
              .deleteUser(user.userId)
              .then((res) => {
                toastify("success", "Delete user successfully!");
                fetchUserList();
              })
              .catch((err) => {
                toastify("error", err.response.data.message);
              });
          }}
          okText="Yes"
          cancelText="No"
          icon={
            <QuestionCircleOutlined className="pt-1 text-red-500 text-xl" />
          }
        >
          <DeleteOutlined className="text-red-500 text-2xl" />
        </Popconfirm>
      </Space>
    </>
  );
};

export default UserActions;
