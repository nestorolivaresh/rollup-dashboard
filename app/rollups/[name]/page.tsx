"use client";

import { Balances } from "@/app/components/Rollup/Balances";
import { BlockExplorer } from "@/app/components/Rollup/BlockExplorer";
import { ChainInfo } from "@/app/components/Rollup/ChainInfo";
import { Contracts } from "@/app/components/Rollup/Contracts";
import { Header } from "@/app/components/Rollup/Header";
import { RPC } from "@/app/components/Rollup/RPC";
import { Transactions } from "@/app/components/Rollup/Transactions";
import { RollupProvider } from "@/app/context/useRollupContext";
import { useParams } from "next/navigation";

export default function RollupPage() {
  const { name } = useParams();

  return (
    <RollupProvider name={name as string}>
      <main className="w-full px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">
        <Header />
        <div className="w-full flex flex-col lg:flex-row mt-6 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-3/4 space-y-6">
            <Balances />
            <RPC />
            <Contracts />
            <BlockExplorer />
            <Transactions />
          </div>
          <div className="w-full lg:w-1/4">
            <ChainInfo />
          </div>
        </div>
      </main>
    </RollupProvider>
  );
}
