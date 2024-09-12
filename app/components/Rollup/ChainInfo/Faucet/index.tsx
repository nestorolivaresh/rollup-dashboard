import { Button } from "@/app/components/common/Button";
import { Card } from "@/app/components/common/Card";
import { faucetContract } from "@/app/constants/contracts";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { HandHelping } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount, useWriteContract } from "wagmi";

export const Faucet = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const handleRequest = async () => {
    await writeContract({
      abi: faucetContract.abi,
      address: faucetContract.address as `0x${string}`,
      functionName: "requestTokens",
      args: [],
    });
  };

  useEffect(() => {
    if (hash) {
      toast.success("Tokens requested successfully");
    }
  }, [hash]);

  useEffect(() => {
    if (error) {
      toast.error(
        "An error occurred while requesting tokens. Please try again later."
      );
    }
  }, [error]);

  return (
    <Card className="flex-col !mt-[40px]">
      <div className="flex justify-between mb-[12px]">
        <div className="flex flex-col items-start ">
          <div className="flex items-center justify-center mb-[6px]">
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <HandHelping size={20} color="#CCBFB6" className="mr-[10px]" />
            </div>
            <span className="text-sm sm:text-base md:text-lg text-white font-bold">
              Faucet
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-white">
              Request gas tokens into your wallet (max every 30 min)
            </span>
          </div>
        </div>
      </div>
      {isConnected ? (
        <Button
          className="justify-end self-end"
          onClick={() => handleRequest()}
          disabled={isPending}
        >
          Request
        </Button>
      ) : (
        <Button className="justify-end self-end" onClick={openConnectModal!}>
          Connect Wallet
        </Button>
      )}
    </Card>
  );
};
