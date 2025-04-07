import { HTMLProps, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface BaseDialogProps extends HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  barrierDismissible?: boolean;
}

export default function BaseDialog({
  isOpen,
  onClose,
  barrierDismissible = true,
  ...restProps
}: BaseDialogProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle mounting the component to prevent SSR issues
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle animation states when isOpen changes
  useEffect(() => {
    if (isOpen) {
      // First render the dialog (invisible)
      setIsMounted(true);

      // Then trigger animation after a small delay to ensure DOM update
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      return () => clearTimeout(showTimer);
    } else {
      // Start hide animation
      setIsVisible(false);

      // Remove from DOM after animation completes
      const hideTimer = setTimeout(() => {
        setIsMounted(false);
      }, 300); // Match this with your animation duration

      return () => clearTimeout(hideTimer);
    }
  }, [isOpen]);

  function dismiss() {
    if (barrierDismissible) {
      onClose();
    }
  }

  // Early return if dialog shouldn't be rendered
  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-30" : "opacity-0"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dismiss();
        }}
      />

      {/* Dialog content - centered with flex */}
      <div
        className={`${
          restProps.className
        } z-10 transition-all duration-300 ease-in-out ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {restProps.children}
      </div>
    </div>,
    document.body
  );
}
