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
      <main className="w-full min-w-[1200px] mt-[24px]">
        <Header />
        <div className="w-full flex">
          <div className="w-full mr-[12px]">
            <Balances />
            <RPC />
            <Contracts />
            <BlockExplorer />
            <Transactions />
          </div>
          <ChainInfo />
        </div>
      </main>
    </RollupProvider>
  );
}
