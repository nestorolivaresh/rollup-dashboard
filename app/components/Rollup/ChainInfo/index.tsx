import { ArrowRightLeft, Box } from "lucide-react";
import { InfoItem } from "./InfoItem";
import { useRollupContext } from "@/app/context/useRollupContext";
import { ExternalLinks } from "./ExternalLinks";
import { AddToWallet } from "./AddToWallet";
import { Skeleton } from "../../common/Skeleton";
import { Faucet } from "./Faucet";

export const ChainInfo = () => {
  const { rollup, loadingRollupData } = useRollupContext();

  return (
    <aside className="w-full lg:max-w-[300px] flex flex-col p-4 border border-[#272727] rounded-xl">
      {loadingRollupData ? (
        <Skeleton className="w-full h-10 mb-6" />
      ) : (
        <AddToWallet />
      )}
      <div className="flex flex-col space-y-2 sm:space-y-4">
        {loadingRollupData ? (
          <>
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-3/4 h-6 my-6" />
            <Skeleton className="w-3/4 h-6 mb-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
          </>
        ) : (
          <>
            <InfoItem
              category="framework"
              value={rollup?.chain?.stack as string}
            />
            <InfoItem
              category="settlement"
              value={rollup?.chain?.settlement?.name as string}
            />
            <InfoItem
              category="da"
              value={rollup?.chain?.dataAvailability?.name as string}
            />
            <InfoItem
              category="token"
              value={rollup?.chain?.nativeCurrency?.symbol as string}
              className="my-6"
            />
            <InfoItem
              category="chainId"
              value={rollup?.chain?.chainId as number}
              className="mb-6"
            />
            <ExternalLinks
              link={rollup?.urls?.bridge?.ui as string}
              label="Bridge"
              icon={
                <ArrowRightLeft size={20} color="#CCBFB6" className="mr-2" />
              }
              className="mb-2"
            />
            <ExternalLinks
              link={rollup?.urls?.l2?.explorer as string}
              label="Block Explorer"
              icon={<Box size={20} color="#CCBFB6" className="mr-2" />}
            />
            <Faucet />
          </>
        )}
      </div>
    </aside>
  );
};
