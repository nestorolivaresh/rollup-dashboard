import { ArrowRightLeft, Box } from "lucide-react";
import { InfoItem } from "./InfoItem";
import { useRollupContext } from "@/app/context/useRollupContext";
import { ExternalLinks } from "./ExternalLinks";
import { AddToWallet } from "./AddToWallet";
import { Skeleton } from "../../common/Skeleton";

export const ChainInfo = () => {
  const { rollup, loadingRollupData } = useRollupContext();

  return (
    <aside className="w-full max-w-[275px] h-fit flex flex-col p-[16px] border border-[#272727] rounded-[12px]">
      {loadingRollupData ? (
        <Skeleton className="w-full h-[40px] mb-[24px]" />
      ) : (
        <AddToWallet />
      )}
      <div className="flex flex-col">
        {loadingRollupData ? (
          <Skeleton className="w-[75%] h-[24px] mb-[4px]" />
        ) : (
          <InfoItem category="framework" value={rollup?.chain?.stack} />
        )}
        {loadingRollupData ? (
          <Skeleton className="w-[75%] h-[24px] mb-[4px]" />
        ) : (
          <InfoItem
            category="settlement"
            value={rollup?.chain?.settlement?.name}
          />
        )}
        {loadingRollupData ? (
          <Skeleton className="w-full h-[24px] mb-[4px]" />
        ) : (
          <InfoItem
            category="da"
            value={rollup?.chain?.dataAvailability?.name}
          />
        )}
        {loadingRollupData ? (
          <Skeleton className="w-[75%] h-[24px] my-[24px]" />
        ) : (
          <InfoItem
            category="token"
            value={rollup?.chain?.nativeCurrency?.symbol}
            className="!my-[24px]"
          />
        )}
        {loadingRollupData ? (
          <Skeleton className="w-[75%] h-[24px] mb-[24px]" />
        ) : (
          <InfoItem
            category="chainId"
            value={rollup?.chain?.chainId}
            className="!mb-[24px]"
          />
        )}
        {loadingRollupData ? (
          <Skeleton className="w-[100%] h-[24px] mb-[4px]" />
        ) : (
          <ExternalLinks
            link={rollup?.urls?.bridge?.ui}
            label="Bridge"
            icon={
              <ArrowRightLeft size={20} color="#CCBFB6" className="mr-[8px]" />
            }
            className="!mb-[8px]"
          />
        )}
        {loadingRollupData ? (
          <Skeleton className="w-[100%] h-[24px] mb-[4px]" />
        ) : (
          <ExternalLinks
            link={rollup?.urls?.l2?.explorer}
            label="Block Explorer"
            icon={<Box size={20} color="#CCBFB6" className="mr-[8px]" />}
          />
        )}
      </div>
    </aside>
  );
};
