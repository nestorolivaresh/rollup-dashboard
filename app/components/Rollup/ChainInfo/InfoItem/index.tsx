import { setRollupDAIcon } from "@/app/utils/setRollupDAIcon";
import { setRollupFrameworkIcon } from "@/app/utils/setRollupFrameworkIcon";
import { setRollupSettlementIcon } from "@/app/utils/setRollupSettlementIcon";
import { setRollupTokenIcon } from "@/app/utils/setRollupTokenIcon";
import { useMemo } from "react";

interface InfoItemProps {
  category: "framework" | "settlement" | "da" | "token" | "chainId";
  value: string | number;
  className?: string;
}

export const InfoItem = ({ category, value, className }: InfoItemProps) => {
  const itemIconUrl = useMemo(() => {
    switch (category) {
      case "framework":
        return setRollupFrameworkIcon(value as string);
      case "settlement":
        return setRollupSettlementIcon(value as string);
      case "da":
        return setRollupDAIcon(value as string);
      case "token":
        return setRollupTokenIcon(value as string);
    }
  }, [category, value]);

  const formattedCategory = useMemo(() => {
    switch (category) {
      case "framework":
        return "Framework";
      case "settlement":
        return "Settlement";
      case "da":
        return "DA layer";
      case "token":
        return "Native Token";
      case "chainId":
        return "Chain ID";
    }
  }, [category]);

  return (
    <div
      className={`
        inline-flex flex-wrap items-center
        p-1.5 sm:p-2 sm:mb-2
        bg-[#1c1c1c] border border-[#272727]
        ${category === "token" ? "rounded-full" : "rounded"}
        ${className}
      `}
    >
      {category !== "chainId" && (
        <img
          src={itemIconUrl}
          alt={`${category}-${value}`}
          width={20}
          height={20}
          className={`
            mr-1.5 sm:mr-2
            ${category === "token" ? "rounded-full" : ""}
          `}
        />
      )}
      <span
        className={`
        text-xs sm:text-sm text-[#FFEFE3] font-bold 
        mr-1.5 sm:mr-2
        ${category === "da" ? "uppercase" : "capitalize"}
      `}
      >
        {value}
      </span>
      <span className="text-xs sm:text-sm text-[#CCBFB6] capitalize">
        {formattedCategory}
      </span>
    </div>
  );
};
