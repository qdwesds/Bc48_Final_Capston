import React from "react";
import { useDispatch } from "react-redux";
import {
  setLoadingEnd,
  setLoadingStart,
} from "../../../../redux/Slice/loadingSlice";
import { projectServ } from "../../../../services/projectServ";
import { Avatar, Popover, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProjectMembersShowAll from "../Mobile/ProjectMembersShowAll";
import ProjectMembersAddNew from "../Mobile/ProjectMembersAddNew";



const ProjectMembers = ({ projectId, projectName, members }) => {
  const renderMembers = (members) => {
    const totalMembers = members.length;
    if (totalMembers === 0) return null;
    if (totalMembers <= 2) {
      return members.map((member, index) => (
        <Avatar src={member.avatar} key={member.userId.toString() + index} />
      ));
    }
    const membersExcludeLast = members.slice(0, 2);
  
    return (
      <>
        {membersExcludeLast.map((member, index) => (
          <Avatar src={member.avatar} key={member.userId.toString() + index} />
        ))}
  
        <Avatar className="inline-flex justify-center items-center bg-cyan-100 text-cyan-500 text-base">
          +{totalMembers - 2}
        </Avatar>
      </>
    );
  };
  
  const dispatch = useDispatch();

  const handleAssignUser = (userId) => {
    dispatch(setLoadingStart());
    projectServ
      .assignUser(projectId, userId)
      .then((res) => {
        dispatch(projectServ.getAllAndDispatch("Member added successfully"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(setLoadingEnd());
      });
  };

  const handleDeleteMember = (memberId) => {
    dispatch(setLoadingStart());
    projectServ
      .deleteMember(projectId, memberId)
      .then((res) => {
        console.log(res);
        dispatch(projectServ.getAllAndDispatch("Member deleted"));
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(setLoadingEnd());
      });
  };
  return (
    <div className="flex items-center">
      <Popover
        className="cursor-pointer"
        placement="top"
        content={
          <ProjectMembersShowAll
            members={members}
            handleDeleteMember={handleDeleteMember}
          />
        }
        trigger="click"
      >
        <div className="flex">
          <Avatar.Group size={40}>{renderMembers(members)}</Avatar.Group>
        </div>
      </Popover>
      <Popover
        placement="right"
        content={
          <ProjectMembersAddNew
            projectName={projectName}
            handleAssignUser={handleAssignUser}
          />
        }
        trigger="click"
        destroyTooltipOnHide={true}
      >
        <div className="w-10 h-10 ml-2 flex justify-center items-center bg-cyan-400 hover:bg-cyan-500 rounded-full text-white cursor-pointer transition duration-300">
          <PlusOutlined style={{ fontSize: "1rem" }} />
        </div>
      </Popover>
    </div>
  );
};

export default ProjectMembers;
