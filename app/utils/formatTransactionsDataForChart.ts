import { TransactionCount } from "../types/rollupTransactions";
import { formatTimestamp } from "./formatTimestamp";

export const formatTransactionsDataForChart = (
  transactions: TransactionCount[]
) => {
  return transactions.map((item: TransactionCount) => ({
    time: formatTimestamp(item.aggregationTimestamp),
    transactions: item.transactionsCount,
  }));
};
