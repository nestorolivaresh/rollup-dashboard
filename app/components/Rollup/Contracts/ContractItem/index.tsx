import { Skeleton } from "@/app/components/common/Skeleton";
import { ARBITRUM_SEPOLIA_TESTNET_URL } from "@/app/constants/rollup";
import { useRollupContext } from "@/app/context/useRollupContext";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

interface ContractItemProps {
  label: string;
  address: string;
  isL2?: boolean;
}

export const ContractItem = ({ label, address, isL2 }: ContractItemProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { rollup, loadingRollupData } = useRollupContext();

  const handleCopy = async (
    text: string,
    setIsCopied: (value: boolean) => void
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full flex items-center justify-between my-[12px]">
      {loadingRollupData ? (
        <div className="w-[25%]">
          <Skeleton className="w-full h-[20px]" />
        </div>
      ) : (
        <div className="flex items-center">
          <span className="text-[#CCBFB6] text-sm font-medium mr-[6px]">
            Contract Name
          </span>
          <span className="text-[#FFEFE3] text-sm font-medium whitespace-nowrap mr-2">
            {label}
          </span>
        </div>
      )}
      {loadingRollupData ? (
        <div className="w-[70%]">
          <Skeleton className="w-full h-[20px]" />
        </div>
      ) : (
        <div className="flex items-center">
          <span className="text-[#CCBFB6] text-sm font-medium mr-[6px]">
            Address
          </span>
          <a
            href={`${
              isL2 ? rollup?.urls?.l2?.explorer : ARBITRUM_SEPOLIA_TESTNET_URL
            }address/${address}`}
            target="_blank"
            className="text-[#FFEFE3] text-sm font-medium whitespace-nowrap mr-2 hover:opacity-80"
          >
            {address}
          </a>
          <button
            onClick={() => handleCopy(address, setIsCopied)}
            data-tooltip-id={`${address}-copy-tooltip-${isL2 ? "l2" : "l1"}`}
            className="p-1 hover:bg-gray-700 rounded mr-[6px]"
          >
            {isCopied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-[#CCBFB6]" />
            )}
          </button>
          <Tooltip
            id={`${address}-copy-tooltip-${isL2 ? "l2" : "l1"}`}
            content={isCopied ? "Copied!" : "Copy to clipboard"}
          />
        </div>
      )}
    </div>
  );
};
