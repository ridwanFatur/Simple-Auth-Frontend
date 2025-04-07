import { useAppContext } from "../../global_context/AppStateContext";
import Logo from "../base/Logo";
import Button from "../base/Button";
import { useState } from "react";
import LogoutDialog from "./LogoutDialog";
import VerificationRepo from "@/data/remote/user_settings/verification_repo";
import { User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { user, logout, isMobileMenuOpen } = useAppContext();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isSendEmailLoading, setIsSendEmailLoading] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  async function sendVerificationEmail() {
    setIsSendEmailLoading(true);
    try {
      await VerificationRepo.send_email();
    } catch (e) {
      /** */
    }
    setIsSendEmailLoading(false);
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <header
        className={`bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm ${
          isMobileMenuOpen ? "md:z-10 z-30" : "z-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - visible on all screen sizes but pushed to center on mobile */}
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="flex-shrink-0 md:hidden">
                <Logo size="sm" />
              </div>
            </div>

            {/* Center section - can be used for navigation if needed */}
            <div className="hidden md:block flex-1 mx-4">
              {/* Add navigation links here if needed */}
            </div>

            {/* User information and actions */}
            <div className="flex items-center">
              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center">
                <div className="flex flex-col items-end mr-2">
                  <span className="text-sm font-medium text-gray-800">
                    {user?.full_name || user?.email}
                  </span>
                  <div className="flex items-center">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        user?.verified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.verified ? "Verified" : "Not Verified"}
                    </span>
                    {!user?.verified && (
                      <button
                        onClick={sendVerificationEmail}
                        disabled={isSendEmailLoading}
                        className="ml-2 text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {isSendEmailLoading ? "Sending..." : "Verify"}
                      </button>
                    )}
                  </div>
                </div>

                {/* User avatar */}
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <User size={16} />
                </div>

                {/* Logout button on desktop */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLogoutDialogOpen(true)}
                  className="ml-4"
                >
                  Logout
                </Button>
              </div>

              {/* Mobile User Menu Button */}
              <div className="md:hidden relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUserMenu();
                  }}
                  className="flex items-center space-x-1 p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none cursor-pointer"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <User size={16} />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {user?.full_name || user?.email}
                      </p>
                      <div className="flex items-center mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            user?.verified
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user?.verified ? "Verified" : "Not Verified"}
                        </span>
                        {!user?.verified && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent menu from closing
                              sendVerificationEmail();
                            }}
                            disabled={isSendEmailLoading}
                            className="ml-2 text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                          >
                            {isSendEmailLoading ? "Sending..." : "Verify"}
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent propagation
                        setIsUserMenuOpen(false);
                        setIsLogoutDialogOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile verification banner - shown only when not verified */}
          {!user?.verified && (
            <div className="md:hidden py-2 px-3 bg-amber-50 -mt-1 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs text-amber-800">
                Your account is not verified
              </span>
              <Button
                isLoading={isSendEmailLoading}
                onClick={sendVerificationEmail}
                variant="secondary"
                size="sm"
              >
                Verify Now
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Backdrop for mobile user menu */}
      {isUserMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsUserMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onLogout={logout}
      />
    </>
  );
}
