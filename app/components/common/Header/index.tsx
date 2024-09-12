import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { Button } from "../Button";
import { Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import { formatWalletAddress } from "@/app/utils/formatWalletAddress";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const pathname = usePathname();

  const { address } = useAccount();

  const handleButtonClick = () => {
    if (address) {
      openAccountModal!();
      return;
    }
    openConnectModal!();
  };

  const buttonContent = useMemo(() => {
    if (address) {
      return formatWalletAddress(address);
    }
    return "Connect Wallet";
  }, [address]);

  return (
    <header className="w-full flex justify-end mt-[24px]">
      {pathname !== "/" && (
        <Button
          className="w-full max-w-[240px]"
          onClick={handleButtonClick}
          icon={
            address && <Wallet size={20} color="#000" className="mr-[8px]" />
          }
        >
          <span className="text-[#000]">{buttonContent}</span>
        </Button>
      )}
    </header>
  );
};
