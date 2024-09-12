interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`w-full flex items-center p-[16px] border border-[#272727] rounded-[12px] ${className}`}
    >
      {children}
    </div>
  );
};
