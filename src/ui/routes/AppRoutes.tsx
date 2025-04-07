import { Navigate, Route, Routes } from "react-router-dom";
import ProgressCircle from "../global_components/base/ProgressCircle";
import { useAppContext } from "../global_context/AppStateContext";
import { MainLayoutRoute } from "../layouts/MainLayout";
import { AuthLayoutRoute } from "../layouts/AuthLayout";
import { DashboardPageRoute } from "../pages/home/dashboard/DashboardPage";
import { LoginPageRoute } from "../pages/auth/login/LoginPage";
import { RegisterPageRoute } from "../pages/auth/register/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import { VerifyPageRoute } from "../pages/auth/verify/VerifyPage";
import ProjectsPage from "../pages/home/projects/ProjectsPage";
import TasksPage from "../pages/home/tasks/TasksPage";
import { SettingsPageRoute } from "../pages/home/settings/SettingsPage";

export default function AppRoutes() {
  const appState = useAppContext();

  if (!appState.isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ProgressCircle isIndeterminate={true} />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />

        {/* Main Layout Routes */}
        <Route path="/main" element={<MainLayoutRoute />}>
          <Route path="" element={<DashboardPageRoute />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPageRoute />} />
        </Route>

        {/* Auth Layout Routes */}
        <Route path="/auth" element={<AuthLayoutRoute />}>
          <Route path="" element={<LoginPageRoute />} />
          <Route path="login" element={<LoginPageRoute />} />
          <Route path="register" element={<RegisterPageRoute />} />
        </Route>
        {/* Verify */}
        <Route
          path="/verify_email/:code/:email"
          element={<VerifyPageRoute />}
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
