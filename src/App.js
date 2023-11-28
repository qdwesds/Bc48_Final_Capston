import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import UserTemplate from "./templates/Users/UserTemplate";
import PrivateRoutes from "./components/Route/PrivateRoutes/PrivateRoutes";
import CreateProject from "./pages/ProjectPages/CreateProject/CreateProject";
import ProjectDetail from "./pages/ProjectPages/ProjectDetail/ProjectDetail";
import Profile from "./pages/Profile/Profile";
import UserManagement from "./pages/AdminPage/UserManagement/UserManagement";
import ProjectManagement from "./pages/ProjectPages/ProjectManagement/ProjectManagement";
import Loading from "./components/Loading/Loading";
import GeneralDrawer from "./components/Drawer/Drawer";
import ModalComponent from "./components/Modal/ModalComponent";

function App() {
  return (
    <>
      <Loading />
      <GeneralDrawer/>
      <ModalComponent/>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<ProjectManagement />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route
              path="project-detail/:projectId"
              element={<ProjectDetail />}
            />
            <Route path="profile" element={<Profile />} />
            <Route path="admin/userManagement" element={<UserManagement />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
