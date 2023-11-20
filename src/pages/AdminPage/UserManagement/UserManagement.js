import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { userServ } from "./../../../services/userServ";
import UserActions from "./UserActions";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = () => {
      userServ
        .getAllUser()
        .then((res) => {
          // console.log(res.data.content);
          let data = res.data.content.map((user) => {
            return {
              ...user,
              action: <UserActions fetchUserList={fetchUserList} user={user} />,
            };
          });
          setUserList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUserList();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-center font-bold text-3xl pb-5">User Management</h1>
      <UserTable userList={userList} />
    </div>
  );
};

export default UserManagement;
