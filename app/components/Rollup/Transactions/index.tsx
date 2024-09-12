import { useRollupContext } from "@/app/context/useRollupContext";
import { Zap } from "lucide-react";
import { Chart } from "./Chart";
import { Card } from "../../common/Card";
import { Skeleton } from "../../common/Skeleton";

export const Transactions = () => {
  const { loadingTransactionsData, loadingRollupData } = useRollupContext();

  return (
    <Card className="w-full flex-col mt-[16px]">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex">
          <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#1c1c1c] rounded-[6px] mr-[12px]">
            <Zap size={20} color="#807872" />
          </div>
          <div className="w-full flex flex-col">
            <span className="text-[#FFEFE3] text-sm font-medium">
              Transactions
            </span>
            <span className="text-[#807872] text-sm">Updated hourly</span>
          </div>
        </div>
      </div>
      <div className="w-full mt-[12px]">
        {loadingTransactionsData || loadingRollupData ? (
          <Skeleton className="w-full h-[240px]" />
        ) : (
          <Chart />
        )}
      </div>
    </Card>
  );
};
