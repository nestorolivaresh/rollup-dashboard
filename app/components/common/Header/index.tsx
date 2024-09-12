import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../Button";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full flex mt-4 sm:mt-6 px-4 sm:px-6">
      {pathname !== "/" && (
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center w-[100px] h-[50px] rounded-lg flex-shrink-0">
            <Image
              src="/gelato-logo.svg"
              alt="logo"
              width={150}
              height={100}
              layout="responsive"
            />
          </div>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  className={`${
                    !ready ? "opacity-0 pointer-events-none select-none" : ""
                  }`}
                  aria-hidden={!ready}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button
                          onClick={openConnectModal}
                          className="w-full sm:w-[170px] text-xs sm:text-sm py-2 px-3 sm:py-2 sm:px-4"
                        >
                          Connect Wallet
                        </Button>
                      );
                    }

                    return (
                      <Button
                        onClick={openAccountModal}
                        className="w-full sm:w-[150px] text-xs sm:text-sm py-2 px-3 sm:py-2 sm:px-4 border border-[#272727] rounded-lg hover:border-[#807872] bg-transparent text-white truncate"
                      >
                        {account.displayName}
                      </Button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      )}
    </header>
  );
};
