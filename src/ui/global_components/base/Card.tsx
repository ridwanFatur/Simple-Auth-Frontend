import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export default function Card({
  children,
  className = "",
  noPadding = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow ${
        noPadding ? "" : "p-4"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
