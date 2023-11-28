import { CloseCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm } from "antd";
import React from "react";
import { DesktopView } from "../../../../components/HOC/responsive";

const ProjectMembersShowAll = ({ members, handleDeleteMember }) => {
  const renderDeleteButtonDesktop = (member) => (
    <Popconfirm
      title={
        <span className="text-lg pl-1">
          Are you sure to delete{" "}
          <span className="font-semibold">{member.name}</span>?
        </span>
      }
      onConfirm={() => {
        handleDeleteMember(member.userId);
      }}
      okText="Yes"
      okButtonProps={{
        type: "default",
        danger: true,
        size: "large",
        className: "btn-delete-ok",
      }}
      cancelText="No"
      cancelButtonProps={{
        type: "primary",
        size: "large",
        className: "btn-delete-cancel",
      }}
      icon={<QuestionCircleOutlined className="top-1 text-red-500 text-xl" />}
    >
      <CloseCircleOutlined
        style={{ fontSize: 20 }}
        className="text-red-500 cursor-pointer"
      />
    </Popconfirm>
  );
  return <div className="container">
  <p className="w-full mb-0 px-2 bg-gray-200 text-sm text-gray-500 font-bold uppercase">
    all members
  </p>
  <div className="w-full max-h-96 overflow-y-auto">
    {members.map((member, index) => (
      <div
        className="px-3 py-2 flex justify-between items-center hover:bg-slate-100"
        key={member.userId.toString() + index}
      >
        <div className="flex items-center">
          <div>
            <Avatar src={member.avatar} />
          </div>
          <p className="ml-2 mb-0 pr-2 align-middle text-lg">
            {member.name}
          </p>
        </div>
        <DesktopView>{renderDeleteButtonDesktop(member)}</DesktopView>
      </div>
    ))}
  </div>
</div>;
};

export default ProjectMembersShowAll;
