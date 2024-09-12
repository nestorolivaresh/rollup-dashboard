import { useRollupContext } from "@/app/context/useRollupContext";
import { Zap } from "lucide-react";
import { Chart } from "./Chart";
import { Card } from "../../common/Card";
import { Skeleton } from "../../common/Skeleton";

export const Transactions = () => {
  const { loadingTransactionsData, loadingRollupData } = useRollupContext();

  return (
    <Card className="w-full flex flex-col mt-4 p-4">
      <div className="w-full flex items-start sm:items-center">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#1c1c1c] rounded-md mr-3">
          <Zap size={20} color="#807872" />
        </div>
        <div className="flex flex-col">
          <span className="text-[#FFEFE3] text-sm font-medium">
            Transactions
          </span>
          <span className="text-[#807872] text-xs sm:text-sm">
            Updated hourly
          </span>
        </div>
      </div>
      <div className="w-full mt-4">
        {loadingTransactionsData || loadingRollupData ? (
          <div className="w-full h-40 sm:h-60">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full h-40 sm:h-60">
            <Chart />
          </div>
        )}
      </div>
    </Card>
  );
};
