import { useRollupContext } from "@/app/context/useRollupContext";
import { ChevronDown, ChevronUp, ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";
import { ContractItem } from "./ContractItem";
import { Card } from "../../common/Card";

export const Contracts = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { rollup, loadingRollupData } = useRollupContext();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const l1Contracts = useMemo(() => {
    if (loadingRollupData) return new Array(7).fill(1);
    if (!rollup?.addresses?.contracts?.l1) return [];
    return Object.keys(rollup?.addresses?.contracts?.l1)?.map((contract) => ({
      label: contract,
      address: rollup?.addresses?.contracts?.l1[contract],
    }));
  }, [rollup, loadingRollupData]);

  const l2Contracts = useMemo(() => {
    if (loadingRollupData) return new Array(7).fill(1);
    if (!rollup?.addresses?.contracts?.l2) return [];
    return Object.keys(rollup?.addresses?.contracts?.l2)?.map((contract) => ({
      label: contract,
      address: rollup?.addresses?.contracts?.l2[contract],
    }));
  }, [rollup, loadingRollupData]);

  return (
    <Card className="!block mt-4 hover:border-[#807872]">
      <div
        className={`w-full cursor-pointer transition-all duration-300 ease-in-out ${
          isExpanded ? "mb-3" : ""
        }`}
        onClick={toggleExpand}
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center mr-3 bg-[#1c1c1c] rounded-md">
              <ReceiptText className="text-[#807872]" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[#FFEFE3] text-sm font-medium">
                Contracts
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#807872]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#807872]" />
            )}
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="w-full my-3 px-4">
          <div className="w-full border-b border-[#272727] pb-3">
            <span className="text-[#FFEFE3] text-md font-medium">
              L1 Contracts
            </span>
          </div>
          <div className="space-y-2 mt-2">
            {l1Contracts?.map((contract, index) => (
              <ContractItem
                key={index + "l1"}
                label={contract.label}
                address={contract.address}
              />
            ))}
          </div>
        </div>
        <div className="my-3 px-4">
          <div className="w-full flex items-center border-y border-[#272727] py-3">
            <span className="text-[#FFEFE3] text-md font-medium">
              L2 Contracts
            </span>
          </div>
          <div className="space-y-2 mt-2">
            {l2Contracts?.map((contract, index) => (
              <ContractItem
                isL2
                key={index + "l2"}
                label={contract.label}
                address={contract.address}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
