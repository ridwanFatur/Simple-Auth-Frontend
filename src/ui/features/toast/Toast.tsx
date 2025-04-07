// components/Toast.tsx
import React, { useEffect, useState } from "react";
import { ToastProps, ToastType, ToastStyle } from "./toast.types";

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Handle animation before removal
  const handleClose = (): void => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with animation duration
  };

  // Auto-close after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 4700); // Slightly less than 5s to account for exit animation

    return () => clearTimeout(timer);
  }, [onClose]);

  // Determine toast styles based on type
  const getToastStyles = (): ToastStyle => {
    switch (type) {
      case ToastType.SUCCESS:
        return {
          background: "bg-green-500",
          color: "text-white",
          iconClass: "✓",
        };
      case ToastType.ERROR:
        return {
          background: "bg-red-500",
          color: "text-white",
          iconClass: "✕",
        };
      case ToastType.WARNING:
        return {
          background: "bg-yellow-500",
          color: "text-white",
          iconClass: "⚠",
        };
      case ToastType.INFO:
      default:
        return {
          background: "bg-blue-500",
          color: "text-white",
          iconClass: "ℹ",
        };
    }
  };

  const toastStyles = getToastStyles();

  // Animation classes
  const enterClasses =
    "transform translate-x-0 opacity-100 transition-all duration-300 ease-out";
  const exitClasses =
    "transform translate-x-full opacity-0 transition-all duration-300 ease-in";

  return (
    <div
      className={`
        flex items-center p-3 rounded shadow-lg ${toastStyles.background} ${
        toastStyles.color
      }
        ${isExiting ? exitClasses : enterClasses}
      `}
      style={{
        transformOrigin: "right",
        maxHeight: "200px",
        transition: "all 0.3s ease",
      }}
    >
      <div className="mr-3 text-lg">{toastStyles.iconClass}</div>
      <div className="flex-1">{message}</div>
      <button
        className="bg-transparent border-none text-current cursor-pointer text-base ml-3 opacity-70 hover:opacity-100 transition-opacity"
        onClick={handleClose}
      >
        ✕
      </button>
    </div>
  );
};
