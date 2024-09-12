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
      className={`w-full bg-[#1C1C1C] flex items-center justify-between p-1 sm:p-2 border border-[#272727] rounded-[6px] hover:border-[#807872] transition-colors ${className}`}
      href={link}
      target="_blank"
    >
      <div className="flex items-center space-x-2 sm:space-x-3">
        {icon && (
          <div className="flex-shrink-0 w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px] flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="text-sm sm:text-base md:text-lg">{label}</div>
      </div>
      <div className="flex-shrink-0">
        <SquareArrowOutUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#CCBFB6]" />
      </div>
    </a>
  );
};
