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
      rpcUrl: rollup?.urls?.l2?.http,
      chainId: rollup?.chain?.settlement?.chainId,
    });

  const { data: validatorBalance, isLoading: isValidatorBalanceLoading } =
    useBalanceOf({
      accountAddress: rollup?.addresses?.accounts?.settlement as `0x${string}`,
      rpcUrl: rollup?.urls?.l2?.http,
      chainId: rollup?.chain?.settlement?.chainId,
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
    <Card className="min-h-[72px] flex-col items-start">
      <div className="w-full flex items-center">
        <div className="w-full flex items-center">
          <div className="w-[40px] h-[40px] flex items-center justify-center mr-[12px] bg-[#1c1c1c] rounded-md">
            <Scale className="text-[#807872]" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[#FFEFE3] text-sm font-medium">Balances</span>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex justify-center mr-[40px]">
            {isBatcherBalanceLow && (
              <div className="flex items-center">
                <CircleAlert className="text-[#eed202] mr-[6px]" size={12} />
              </div>
            )}
            <span
              className={`text-[#CCBFB6] text-sm font-medium mr-[6px] ${
                isBatcherBalanceLow ? "text-[#eed202]" : ""
              }`}
            >
              Batcher
            </span>
            {isBatcherBalanceLoading || loadingRollupData ? (
              <Skeleton className="w-[100px] h-full" />
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
          <div className="flex justify-center">
            {isValidatorBalanceLow && (
              <div className="flex items-center">
                <CircleAlert className="text-[#eed202] mr-[6px]" size={12} />
              </div>
            )}
            <span
              className={`text-[#CCBFB6] text-sm font-medium mr-[6px] ${
                isValidatorBalanceLow ? "text-[#eed202]" : ""
              }`}
            >
              Validator
            </span>
            {isValidatorBalanceLoading || loadingRollupData ? (
              <Skeleton className="w-[100px] h-full" />
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
      {isBatcherBalanceLow ||
        (isValidatorBalanceLow && (
          <div className="w-full mt-[12px]">
            <span className="text-[#eed202] text-sm font-medium">
              The highlighted balances are low. Please add funds to the
              corresponding account to ensure the correct operation of the
              rollup.
            </span>
          </div>
        ))}
    </Card>
  );
};
