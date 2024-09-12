import { useMemo } from "react";
import Image from "next/image";
import { useRollupContext } from "@/app/context/useRollupContext";
import { Skeleton } from "../../common/Skeleton";

export const Header = () => {
  const { rollup, loadingRollupData } = useRollupContext();
  const rollupIcon = useMemo(() => {
    switch (rollup?.name) {
      default:
        return "/arbitrum-sepolia.svg";
    }
  }, [rollup?.name]);

  const statusColor = useMemo(() => {
    switch (rollup?.status) {
      case "paused":
        return "yellow-500";
      case "running":
        return "custom-green";
      case "stopped":
        return "red-500";
    }
  }, [rollup?.status]);

  return (
    <div className="w-full flex justify-start pb-[12px] border-b border-[#272727] mb-[24px]">
      <div className="w-[60px] h-[60px] mr-[12px]">
        {loadingRollupData ? (
          <Skeleton className="w-[60px] h-[60px]" />
        ) : (
          <Image src={rollupIcon} alt="Gelato" width={100} height={100} />
        )}
      </div>
      <div>
        {loadingRollupData ? (
          <Skeleton className="w-[100px] h-[24px] mb-[4px]" />
        ) : (
          <h1 className="text-2xl font-bold">{rollup?.name}</h1>
        )}
        {loadingRollupData ? (
          <Skeleton className="w-[100px] h-[24px]" />
        ) : (
          <span
            className={`block w-fit text-[10px] text-${statusColor} border border-${statusColor} px-2 py-1 rounded-md capitalize`}
          >
            {rollup?.status}
          </span>
        )}
      </div>
    </div>
  );
};
