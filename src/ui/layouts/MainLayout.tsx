import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../global_components/feature/Navbar";
import { useAppContext } from "../global_context/AppStateContext";
import Sidebar from "../global_components/feature/Sidebar";
import { useEffect } from "react";

export function MainLayoutRoute() {
  const { user } = useAppContext();

  if (user) {
    return <MainLayout />;
  }

  return <Navigate to="/auth/login" replace />;
}

export default function MainLayout() {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAppContext();

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Handle window resize to close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Navbar />
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all ${
            isMobileMenuOpen
              ? "md:ml-0 blur-sm md:blur-none pointer-events-none md:pointer-events-auto"
              : "ml-0"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
