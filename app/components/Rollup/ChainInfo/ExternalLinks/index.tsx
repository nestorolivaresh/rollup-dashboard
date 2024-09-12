import { SquareArrowOutUpRight } from "lucide-react";

interface ExternalLinksProps {
  link: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export const ExternalLinks = ({
  link,
  label,
  icon,
  className,
}: ExternalLinksProps) => {
  return (
    <a
      className={`w-full h-[48px] bg-[#1C1C1C] flex items-center justify-between p-[9px] border border-[#272727] rounded-[6px] hover:border-[#807872] ${className}`}
      href={link}
      target="_blank"
    >
        <div className="h-[30px] flex items-center">
          {icon && (
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="w-full h-[48px] flex items-center justify-center">
            {label}
          </div>
        </div>
        <div className="h-[30px] flex items-center justify-center">
          <SquareArrowOutUpRight size={20} color="#CCBFB6" />
        </div>
    </a>
  );
};
