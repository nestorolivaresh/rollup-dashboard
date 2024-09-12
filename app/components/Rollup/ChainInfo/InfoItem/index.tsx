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
    <div className={`w-fit bg-[#1c1c1c] flex items-center p-[6px] mb-[6px] border border-[#272727] ${category === "token" ? "rounded-[100px]" : "rounded-[4px]"} ${className}`}>
      {category !== "chainId" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={itemIconUrl}
          alt={`${category}-${value}`}
          width={16}
          height={16}
          className={`mr-[6px] ${category === "token" ? "rounded-full" : ""}`}
        />
      )}
      <span className={`text-sm text-[#FFEFE3] font-bold mr-[6px] ${category === 'da' ? 'uppercase' : 'capitalize'}`}>
        {value}
      </span>
      <span className="text-sm text-[#CCBFB6] capitalize mr-[6px]">
        {formattedCategory}
      </span>
    </div>
  );
};
