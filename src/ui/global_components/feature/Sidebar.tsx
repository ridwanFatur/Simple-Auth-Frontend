import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../base/Logo";

import { Menu, X } from "lucide-react";
import { useAppContext } from "../../global_context/AppStateContext";
import {
  HomeIcon,
  ProjectsIcon,
  SettingsIcon,
  TasksIcon,
} from "@/ui/assets/navbar_icons";

const navItems = [
  {
    name: "Dashboard",
    path: "/main",
    icon: HomeIcon,
  },
  {
    name: "Projects",
    path: "/main/projects",
    icon: ProjectsIcon,
  },
  {
    name: "Tasks",
    path: "/main/tasks",
    icon: TasksIcon,
  },
  {
    name: "Settings",
    path: "/main/settings",
    icon: SettingsIcon,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useAppContext();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent scroll on body when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black opacity-60 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200 mt-14">
          <Logo />
        </div>

        <nav className="py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="rounded-lg bg-gray-50 p-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Storage
            </h3>
            <div className="mt-2">
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-2/3"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">10.2GB of 15GB used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Only visible on medium screens and up */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="h-16 flex items-center px-6">
          <Logo />
        </div>

        <div className="flex flex-col h-full">
          <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive
                        ? "text-blue-500"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="rounded-lg bg-gray-50 p-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Storage
              </h3>
              <div className="mt-2">
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-2/3"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  10.2GB of 15GB used
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
