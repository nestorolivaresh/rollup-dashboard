import React, { createContext, useContext, ReactNode } from "react";
import { useGetRollup } from "../hooks/useGetRollup";
import { RollupPublic } from "../types/rollupPublic";
import { RollupTransactions } from "../types/rollupTransactions";
import { useGetRollupTransactions } from "../hooks/useGetRollupTransactions";

interface RollupContextType {
  rollup: RollupPublic | null;
  transactions: RollupTransactions | null;
  loadingRollupData: boolean;
  loadingTransactionsData: boolean;
}

const RollupContext = createContext<RollupContextType | undefined>({
  rollup: null,
  transactions: null,
  loadingRollupData: true,
  loadingTransactionsData: true,
});

export const useRollupContext = () => {
  const context = useContext(RollupContext);
  if (context === undefined) {
    throw new Error("useRollupContext must be used within a RollupProvider");
  }
  return context;
};

interface RollupProviderProps {
  children: ReactNode;
  name: string;
}

export const RollupProvider: React.FC<RollupProviderProps> = ({
  children,
  name,
}) => {
  const { data, isLoading } = useGetRollup(name);
  const { data: transactionsData, isLoading: isLoadingTransactions } =
    useGetRollupTransactions(data?.data?.id);

  return (
    <RollupContext.Provider
      value={{
        rollup: data?.data,
        transactions: transactionsData?.data?.data,
        loadingRollupData: isLoading,
        loadingTransactionsData: isLoadingTransactions,
      }}
    >
      {children}
    </RollupContext.Provider>
  );
};
