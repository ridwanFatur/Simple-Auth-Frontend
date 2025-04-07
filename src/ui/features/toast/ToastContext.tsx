import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Toast,
  ToastContextType,
  ToastProviderProps,
  ToastType,
} from "./toast.types";
import { ToastContainer } from "./ToastContainer";

// Create context with undefined initial value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a toast
  const addToast = useCallback(
    (
      message: string,
      type: ToastType = ToastType.INFO,
      duration: number = 5000
    ): number => {
      const id = Date.now(); // Create unique ID

      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, type, duration },
      ]);

      // Auto remove toast after duration
      if (duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id; // Return ID for manual removal
    },
    []
  );

  // Function to remove a toast
  const removeToast = useCallback((id: number): void => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods for different toast types
  const success = useCallback(
    (message: string, duration: number = 5000): number =>
      addToast(message, ToastType.SUCCESS, duration),
    [addToast]
  );

  const error = useCallback(
    (message: string, duration: number = 5000): number =>
      addToast(message, ToastType.ERROR, duration),
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration: number = 5000): number =>
      addToast(message, ToastType.WARNING, duration),
    [addToast]
  );

  const info = useCallback(
    (message: string, duration: number = 5000): number =>
      addToast(message, ToastType.INFO, duration),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
