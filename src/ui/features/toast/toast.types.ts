// types/toast.types.ts
import { ReactNode } from "react";

// Toast types enum
export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

// Interface for individual toast
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

// Interface for toast context
export interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => number;
  removeToast: (id: number) => void;
  success: (message: string, duration?: number) => number;
  error: (message: string, duration?: number) => number;
  warning: (message: string, duration?: number) => number;
  info: (message: string, duration?: number) => number;
}

// Props for ToastProvider
export interface ToastProviderProps {
  children: ReactNode;
}

// Props for individual Toast component
export interface ToastProps {
  id: number;
  type: ToastType;
  message: string;
  onClose: () => void;
}

// Interface for toast style
export interface ToastStyle {
  background: string;
  color: string;
  iconClass: string;
}
