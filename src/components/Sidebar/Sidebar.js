import React, { useEffect, useState } from "react";
import {
  FileAddOutlined,
  FileTextOutlined,
  SnippetsOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { collapseSidebar } from "../../redux/Slice/generalSlice";
import generalHooks from "../../utils/generalHooks/generalHooks";
import logo from "./../../assets/Img/jiraCloneLogo.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [currentMenuItem, setCurrentMenuItem] = useState("0");
  const [projectID, setProjectID] = useState(undefined);
  const { sidebarCollapse } = useSelector((state) => state.generalSlice);
  const routesKey = {
    "/create-project": "create-project",
    "/": "project-management",
    "/profile": "profile",
    "/admin/userManagement": "user-management",
    "/project-detail/:projectId": "project-detail",
  };
  const currentPath = generalHooks.usePathPattern();

  const disabledRender = () => {
    if (projectID === undefined) {
      return (
        <a
          className="text-base font-semibold"
          disabled={true}
          style={{
            color: "#ccc",
            backgroundColor: "#eee",
            cursor: "not-allowed",
            opacity: 0.5,
            textTransform: "none",
            transform: "none",
          }}
        >
          Project Detail{" "}
          <span className="text-sm text-gray-400 font-normal">{projectID}</span>
        </a>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (currentPath) {
      if (currentPath === "/project-detail/:projectId") {
        setProjectID(params.projectId);
      }
      setCurrentMenuItem(routesKey[currentPath]);
    } else {
      setCurrentMenuItem("0");
    }
  }, [currentPath]);
  const handleMenuClick = (to) => {
    navigate(to);
  };
  return (
    <Sider
      className="project-sidebar"
      trigger={null}
      collapsible
      collapsed={sidebarCollapse}
      collapsedWidth={0}
      breakpoint="lg"
      theme={"light"}
      width="230"
      style={{ height: "100%" }}
      onBreakpoint={(broken) => {
        if (broken) {
          dispatch(collapseSidebar());
        }
      }}
    >
      <div className="logo py-12">
        <NavLink to="/" className="px-12 flex justify-center items-center">
          <img className="w-full" src={logo} alt="web-logo" />
        </NavLink>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[currentMenuItem]}
        items={[
          {
            key: "create-project",
            icon: (
              <div className="py-1 transition">
                <FileAddOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/create-project");
                }}
              >
                Create Project
              </a>
            ),
          },
          {
            key: "project-management",
            icon: (
              <div className="py-1 transition">
                <SnippetsOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/");
                }}
              >
                Project Management
              </a>
            ),
          },
          {
            key: "project-detail",
            icon: (
              <div className="py-1 transition">
                <FileTextOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  if (projectID) {
                    handleMenuClick(`/project-detail/${projectID}`);
                  }
                }}
              >
                Project Detail{" "}
                <span className="text-sm text-gray-400 font-normal">
                  {projectID}
                </span>
              </a>
            ),
            disabled: disabledRender(),
          },
          {
            key: "profile",
            icon: (
              <div className="py-1 transition">
                <UserOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/profile");
                }}
              >
                My Profile
              </a>
            ),
          },
          {
            key: "user-management",
            icon: (
              <div className="py-1 transition">
                <UsergroupAddOutlined className="flex text-lg" />
              </div>
            ),
            label: (
              <a
                className="text-base font-semibold"
                onClick={() => {
                  handleMenuClick("/admin/userManagement");
                }}
              >
                User Management
              </a>
            ),
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
