import { useMemo } from "react";
import { CircleLoader } from "../CircleLoader";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  children,
  onClick,
  icon,
  className,
  disabled,
  loading,
  ...rest
}: ButtonProps) => {
  const content = useMemo(() => {
    if (loading) {
      return <CircleLoader />;
    }

    if (icon) {
      return (
        <div className="flex items-center justify-center">
          {icon}
          {children}
        </div>
      );
    }
    return children;
  }, [children, icon, loading]);

  return (
    <button
      className={`w-full h-[40px] bg-[#ccbfb6] py-[10px] rounded-md text-[#000] text-sm font-medium hover:opacity-90 cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
};
