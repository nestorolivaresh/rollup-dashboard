import { useRollupContext } from "@/app/context/useRollupContext";
import { Network, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { Card } from "../../common/Card";
import { Skeleton } from "../../common/Skeleton";

export const RPC = () => {
  const { rollup, loadingRollupData } = useRollupContext();
  const [isHttpCopied, setIsHttpCopied] = useState(false);
  const [isWsCopied, setIsWsCopied] = useState(false);

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
    <Card className="mt-4 p-4 sm:p-6">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-10 h-10 flex items-center justify-center mr-3 bg-[#1c1c1c] rounded-md">
            <Network className="text-[#807872]" size={20} />
          </div>
          <span className="text-[#FFEFE3] text-sm font-medium">RPC</span>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-start sm:justify-end space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="text-[#CCBFB6] text-sm font-medium mb-2 sm:mb-0 sm:mr-2">
              HTTP
            </span>
            {loadingRollupData ? (
              <Skeleton className="w-full sm:w-[200px] h-[20px]" />
            ) : (
              <div className="flex items-center">
                <span className="text-[#FFEFE3] text-sm font-medium mr-2 break-all sm:break-normal">
                  {rollup?.urls?.l2?.http}
                </span>
                <button
                  onClick={() =>
                    handleCopy(rollup?.urls?.l2?.http as string, setIsHttpCopied)
                  }
                  data-tooltip-id="copy-http-tooltip"
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  {isHttpCopied ? (
                    <Check size={16} className="text-green-500"  />
                  ) : (
                    <Copy size={16} className="text-[#CCBFB6]" />
                  )}
                </button>
              </div>
            )}
            <Tooltip
              id="copy-http-tooltip"
              content={isHttpCopied ? "Copied!" : "Copy to clipboard"}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="text-[#CCBFB6] text-sm font-medium mb-2 sm:mb-0 sm:mr-2">
              WS
            </span>
            {loadingRollupData ? (
              <Skeleton className="w-full sm:w-[200px] h-[20px]" />
            ) : (
              <div className="flex items-center">
                <span className="text-[#FFEFE3] text-sm font-medium mr-2 break-all sm:break-normal">
                  {rollup?.urls?.l2?.ws}
                </span>
                <button
                  onClick={() =>
                    handleCopy(rollup?.urls?.l2?.ws as string, setIsWsCopied)
                  }
                  data-tooltip-id="copy-ws-tooltip"
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  {isWsCopied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-[#CCBFB6]" />
                  )}
                </button>
              </div>
            )}
            <Tooltip
              id="copy-ws-tooltip"
              content={isWsCopied ? "Copied!" : "Copy to clipboard"}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
