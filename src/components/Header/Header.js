import React from "react";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseSidebar } from "../../redux/Slice/generalSlice";

import toastify from "../../utils/toastify/toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sidebarCollapse } = useSelector((state) => state.generalSlice);
  const { user } = useSelector((state) => state.userSlice);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link to="profile" className="text-base">
              Profile
            </Link>
          ),
          icon: (
            <div className="py-1">
              <UserOutlined className="flex text-lg" />
            </div>
          ),
        },
        {
          key: "4",
          danger: true,
          label: (
            <a
              onClick={() => {
                localStorage.removeItem("user");
                toastify("success", "Log out sucessfully");
                setTimeout(() => {
                  navigate("sign-in");
                }, 700);
              }}
              className="text-base"
            >
              Log out
            </a>
          ),
          icon: (
            <div className="py-1 transition">
              <ExportOutlined rotate={180} className="flex text-lg" />
            </div>
          ),
        },
      ]}
    />
  );
  return (
    <div className="container mx-auto px-4">
      <div className="my-4 py-5 flex justify-between items-center">
        <div>
          {React.createElement(
            sidebarCollapse ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className:
                "trigger text-3xl hover:text-rose-500 transition duration-300",
              onClick: () => dispatch(toggleCollapseSidebar()),
            }
          )}
        </div>
        {user ? (
          <Dropdown trigger={["click"]} overlay={menu}>
            <Space className="cursor-pointer">
              <Avatar src={user?.avatar} size={40} />
              <span className="inline-block text-lg">{user?.name}</span>
            </Space>
          </Dropdown>
        ) : (
          navigate("sign-in")
        )}
      </div>
    </div>
  );
};

export default Header;
