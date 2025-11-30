import React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function ActionButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      }`} 
    >
      {children}
    </button>
  );
}
