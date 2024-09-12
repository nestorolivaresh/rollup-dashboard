import { useMemo } from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const Button = ({ children, onClick, icon, className }: ButtonProps) => {
  const content = useMemo(() => {
    if (icon) {
      return (
        <div className="flex items-center justify-center">
          {icon}
          {children}
        </div>
      );
    }
    return children;
  }, [children, icon]);

  return (
    <button
      className={`w-full h-[40px] bg-[#ccbfb6] py-[10px] rounded-md text-[#000] text-sm font-medium hover:opacity-90 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
