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
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
      {loadingRollupData ? (
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
          <Skeleton className="w-full h-5" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-0">
          <span className="text-[#CCBFB6] text-sm font-medium mr-2 mb-1 sm:mb-0">
            Contract Name
          </span>
          <span className="text-[#FFEFE3] text-sm font-medium">{label}</span>
        </div>
      )}
      {loadingRollupData ? (
        <div className="w-full sm:w-3/4">
          <Skeleton className="w-full h-5" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="text-[#CCBFB6] text-sm font-medium mr-2 mb-1 sm:mb-0">
            Address
          </span>
          <div className="flex items-center">
            <a
              href={`${
                isL2 ? rollup?.urls?.l2?.explorer : ARBITRUM_SEPOLIA_TESTNET_URL
              }address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFEFE3] text-sm font-medium break-all sm:break-normal mr-2 hover:opacity-80"
            >
              {address}
            </a>
            <button
              onClick={() => handleCopy(address)}
              data-tooltip-id={`${address}-copy-tooltip-${isL2 ? "l2" : "l1"}`}
              className="p-1 hover:bg-gray-700 rounded"
            >
              {isCopied ? (
                <Check size={16} className="text-green-500" data-testid="check-icon" />
              ) : (
                <Copy size={16} className="text-[#CCBFB6]" />
              )}
            </button>
            <Tooltip
              id={`${address}-copy-tooltip-${isL2 ? "l2" : "l1"}`}
              content={isCopied ? "Copied!" : "Copy to clipboard"}
            />
          </div>
        </div>
      )}
    </div>
  );
};
