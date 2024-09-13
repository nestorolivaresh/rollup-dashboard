"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../Button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useDisconnectAll } from "@/app/hooks/useDisconnectsAll";

export const Header = () => {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const { disconnectsAll } = useDisconnectAll();

  const handleClickAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <header className="w-full flex mt-4 sm:mt-6 px-4 sm:px-6">
      {pathname !== "/" && (
        <div className="w-full flex items-center justify-between">
          <div
            className="flex items-center w-[100px] h-[50px] rounded-lg flex-shrink-0 cursor-pointer"
            onClick={() => window.open("https://www.gelato.network/", "_blank")}
          >
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
                      <div className="flex">
                        <Button
                          onClick={() => handleClickAddress(account.address)}
                          className="w-full sm:w-[150px] text-xs sm:text-sm py-2 px-3 sm:py-2 sm:px-4 border border-[#272727] rounded-lg hover:border-[#807872] bg-transparent text-white truncate mr-2"
                          data-tooltip-id="copy-user-address-tooltip"
                        >
                          {account.displayName}
                        </Button>
                        <Button
                          onClick={() => disconnectsAll()}
                          className="w-full sm:w-[150px] text-xs sm:text-sm py-2 px-3 sm:py-2 sm:px-4 border border-[#272727] rounded-lg hover:border-[#807872] bg-transparent text-white"
                        >
                          Disconnect
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          <Tooltip
            id="copy-user-address-tooltip"
            content={isCopied ? "Copied!" : "Copy to clipboard"}
          />
        </div>
      )}
    </header>
  );
};
