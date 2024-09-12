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
    <Card className="h-[72px] mt-[16px]">
      <div className="w-full flex items-center">
        <div className="w-[40px] h-[40px] flex items-center justify-center mr-[12px] bg-[#1c1c1c] rounded-md">
          <Network className="text-[#807872]" size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#FFEFE3] text-sm font-medium">RPC</span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex items-center justify-center mr-[40px]">
          <span className="text-[#CCBFB6] text-sm font-medium mr-[6px]">
            HTTP
          </span>
          {loadingRollupData ? (
            <Skeleton className="w-[200px] h-[20px]" />
          ) : (
            <>
              <span className="text-[#FFEFE3] text-sm font-medium whitespace-nowrap mr-2">
                {rollup?.urls?.l2?.http}
              </span>
              <button
                onClick={() =>
                  handleCopy(rollup?.urls?.l2?.http, setIsHttpCopied)
                }
                data-tooltip-id="copy-http-tooltip"
                className="p-1 hover:bg-gray-700 rounded"
              >
                {isHttpCopied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} className="text-[#CCBFB6]" />
                )}
              </button>
            </>
          )}
          <Tooltip
            id="copy-http-tooltip"
            content={isHttpCopied ? "Copied!" : "Copy to clipboard"}
          />
        </div>
        <div className="flex items-center justify-center">
          <span className="text-[#CCBFB6] text-sm font-medium mr-[6px]">
            WS
          </span>
          {loadingRollupData ? (
            <Skeleton className="w-[200px] h-[20px]" />
          ) : (
            <>
              <span className="text-[#FFEFE3] text-sm font-medium whitespace-nowrap mr-2">
                {rollup?.urls?.l2?.ws}
              </span>
              <button
                onClick={() => handleCopy(rollup?.urls?.l2?.ws, setIsWsCopied)}
                data-tooltip-id="copy-ws-tooltip"
                className="p-1 hover:bg-gray-700 rounded"
              >
                {isWsCopied ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} className="text-[#CCBFB6]" />
                )}
              </button>
              <Tooltip
                id="copy-ws-tooltip"
                content={isWsCopied ? "Copied!" : "Copy to clipboard"}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
