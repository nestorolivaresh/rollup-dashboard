import { Button } from "@/app/components/common/Button";
import { useRollupContext } from "@/app/context/useRollupContext";
import { Wallet } from "lucide-react";
import { toast } from "react-toastify";
import { useWalletClient } from "wagmi";

export const AddToWallet = () => {
  const { data: walletClient } = useWalletClient();
  const { rollup } = useRollupContext();

  const addNetwork = async () => {
    if (!window.ethereum) {
      toast.error("You don't have a wallet installed!");
      return;
    }

    try {
      const res = await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${rollup?.chain?.chainId?.toString(16)}`,
            chainName: rollup?.name,
            nativeCurrency: {
              name: rollup?.chain?.nativeCurrency.name,
              symbol: rollup?.chain?.nativeCurrency.symbol,
              decimals: rollup?.chain?.nativeCurrency.decimals,
            },
            rpcUrls: [rollup?.urls?.l2?.http],
            blockExplorerUrls: [rollup?.urls?.l2?.explorer],
          },
        ],
      });
      console.log({ res });

      // After adding the network, switch to it
      walletClient?.switchChain({ id: rollup?.chain?.chainId });
    } catch (error) {
      console.error("Failed to add network:", error);
      toast.error("Failed to add network!");
    }
  };

  return (
    <Button
      className="mb-[24px]"
      onClick={() => addNetwork()}
      icon={<Wallet size={20} color="#000" className="mr-[8px]" />}
    >
      <span className="text-[#000]">Add to Wallet</span>
    </Button>
  );
};
