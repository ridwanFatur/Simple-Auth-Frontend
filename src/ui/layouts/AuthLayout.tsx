import { Navigate, Outlet } from "react-router-dom";
import Logo from "../global_components/base/Logo";
import { useAppContext } from "../global_context/AppStateContext";

export function AuthLayoutRoute() {
  const appState = useAppContext();
  if (appState.user) {
    return <Navigate to="/main" replace />;
  }

  return <AuthLayout />;
}

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center w-full max-w-md px-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
