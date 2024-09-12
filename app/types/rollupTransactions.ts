export interface TransactionCount {
    aggregationTimestamp: number;
    transactionsCount: number;
  }

export interface RollupTransactions {
    last24hCounts: Record<string, number>;
    previous24hCount: Record<string, number>;
    sortedCounts: Record<string, TransactionCount[]>;
  }