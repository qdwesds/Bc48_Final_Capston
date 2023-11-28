import React, { useEffect, useRef, useState } from "react";
import { userServ } from "../../../../services/userServ";
import { Avatar, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { DesktopView } from "../../../../components/HOC/responsive";
import InnerLoading from "../../../../components/Loading/InnerLoading";

const ProjectMembersAddNew = ({ projectName, handleAssignUser, title }) => {
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  const getUserList = (keyword) => {
    setIsLoading(true);
    userServ
      .getUserByKeyword(keyword)
      .then((res) => {
        setUserList(res.data.content);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const renderUser = (user, index) => (
    <div
      className="w-full px-3 py-2 flex justify-between items-center hover:bg-slate-100 cursor-pointer"
      key={user.userId.toString() + index}
    >
      <div className="flex-shrink-0">
        <Avatar src={user.avatar} />
      </div>
      <p className="ml-2 mb-0 align-middle text-lg break-all">{user.name}</p>
    </div>
  );

  const renderUserDesktop = (user, index) => (
    <Popconfirm
      title={
        <span className="text-lg pl-1">
          Adding <span className="font-semibold">{user.name}</span> to{" "}
          <span className="font-semibold">
            {projectName ? projectName : "Project"}
          </span>
          ?
        </span>
      }
      onConfirm={() => {
        handleAssignUser(user.userId);
        inputRef.current.focus();
      }}
      okText="Yes"
      okButtonProps={{ size: "large" }}
      cancelText="No"
      cancelButtonProps={{ size: "large" }}
      icon={
        <QuestionCircleOutlined className="top-1 text-yellow-500 text-xl" />
      }
    >
      {renderUser(user, index)}
    </Popconfirm>
  );

  const renderUsersList = (userList) => {
    if (!userList) return null;
    return (
      <div
        className="flex-grow w-full overflow-y-auto max-h-96
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full"
      >
        {userList.map((user, index) => (
          <>
            <DesktopView>{renderUserDesktop(user, index)}</DesktopView>
          </>
        ))}
      </div>
    );
  };

  const handleInputChange = (event) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      getUserList(event.target.value);
    }, 300);
  };
  return <div className="flex flex-col w-64">
  {!title ? null : (
    <h4 className="flex-shrink-0 pb-2 text-base">{title}</h4>
  )}
  <input
    type="search"
    placeholder="Search users"
    className="block flex-shrink-0 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-orange-500 focus-visible:outline-none"
    ref={inputRef}
    onChange={handleInputChange}
  />
  {isLoading ? (
    <div className="flex-grow w-full">
      <InnerLoading
        spinnerClass={"w-full aspect-square"}
      />
    </div>
  ) : (
    renderUsersList(userList)
  )}
</div>;
};

export default ProjectMembersAddNew;
