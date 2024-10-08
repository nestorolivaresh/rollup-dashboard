import { useRollupContext } from "@/app/context/useRollupContext";
import { useBalanceOf } from "@/app/hooks/useBalanceOf";
import { CircleAlert, Scale } from "lucide-react";
import { useMemo } from "react";
import CountUp from "react-countup";
import { Card } from "../../common/Card";
import { Skeleton } from "../../common/Skeleton";

export const Balances = () => {
  const { rollup, loadingRollupData } = useRollupContext();

  const { data: batcherBalance, isLoading: isBatcherBalanceLoading } =
    useBalanceOf({
      accountAddress: rollup?.addresses?.accounts?.sequencer as `0x${string}`,
      rpcUrl: rollup?.urls?.l2?.http as string,
      chainId: rollup?.chain?.settlement?.chainId as number,
    });

  const { data: validatorBalance, isLoading: isValidatorBalanceLoading } =
    useBalanceOf({
      accountAddress: rollup?.addresses?.accounts?.settlement as `0x${string}`,
      rpcUrl: rollup?.urls?.l2?.http as string,
      chainId: rollup?.chain?.settlement?.chainId as number,
    });

  const formattedBatcherBalance = useMemo(() => {
    return <CountUp end={Number(batcherBalance)} decimals={2} />;
  }, [batcherBalance]);

  const formattedValidatorBalance = useMemo(() => {
    return <CountUp end={Number(validatorBalance)} decimals={2} />;
  }, [validatorBalance]);

  const isBatcherBalanceLow = useMemo(() => {
    return Number(batcherBalance) < 0.01;
  }, [batcherBalance]);

  const isValidatorBalanceLow = useMemo(() => {
    return Number(validatorBalance) < 0.01;
  }, [validatorBalance]);

  return (
    <Card className="min-h-[72px] flex-col items-start p-4">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center">
        <div className="w-full flex items-center mb-4 sm:mb-0">
          <div className="w-[40px] h-[40px] flex items-center justify-center mr-3 bg-[#1c1c1c] rounded-md">
            <Scale className="text-[#807872]" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#FFEFE3] text-sm font-medium">Balances</span>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            {isBatcherBalanceLow && (
              <div className="flex items-center mr-2">
                <CircleAlert className="text-[#eed202]" size={12} />
              </div>
            )}
            <span
              className={`text-[#CCBFB6] text-sm font-medium mr-2 ${
                isBatcherBalanceLow ? "text-[#eed202]" : ""
              }`}
            >
              Batch Poster
            </span>
            {isBatcherBalanceLoading || loadingRollupData ? (
              <Skeleton className="w-[100px] h-5" />
            ) : (
              <span
                className={`text-[#FFEFE3] text-sm font-medium ${
                  isBatcherBalanceLow ? "text-[#eed202]" : ""
                }`}
              >
                {formattedBatcherBalance}{" "}
                {rollup?.chain?.nativeCurrency?.symbol}
              </span>
            )}
          </div>
          <div className="flex items-center">
            {isValidatorBalanceLow && (
              <div className="flex items-center mr-2">
                <CircleAlert className="text-[#eed202]" size={12} />
              </div>
            )}
            <span
              className={`text-[#CCBFB6] text-sm font-medium mr-2 ${
                isValidatorBalanceLow ? "text-[#eed202]" : ""
              }`}
            >
              Validator
            </span>
            {isValidatorBalanceLoading || loadingRollupData ? (
              <Skeleton className="w-[100px] h-5" />
            ) : (
              <span
                className={`text-[#FFEFE3] text-sm font-medium ${
                  isValidatorBalanceLow ? "text-[#eed202]" : ""
                }`}
              >
                {formattedValidatorBalance}{" "}
                {rollup?.chain?.nativeCurrency?.symbol}
              </span>
            )}
          </div>
        </div>
      </div>
      {(isBatcherBalanceLow || isValidatorBalanceLow) && (
        <div className="w-full mt-3">
          <span className="text-[#eed202] text-sm font-medium">
            The highlighted balances are low. Please add funds to the
            corresponding account to ensure the correct operation of the rollup.
          </span>
        </div>
      )}
    </Card>
  );
};
