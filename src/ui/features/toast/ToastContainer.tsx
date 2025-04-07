// components/ToastContainer.tsx
import React from "react";
import { useToast } from "./ToastContext";
import { Toast } from "./Toast";
import { Toast as ToastType } from "./toast.types";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  // Stagger entrance of toasts
  const getAnimationDelay = (index: number): string => {
    return `${index * 0.1}s`;
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map((toast: ToastType, index: number) => (
        <div
          key={toast.id}
          style={{ animationDelay: getAnimationDelay(index) }}
          className="animate-toast-in"
        >
          <Toast
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};
