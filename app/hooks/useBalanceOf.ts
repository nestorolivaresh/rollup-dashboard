import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http, formatUnits } from "viem";
import { arbitrumSepolia } from "../constants/chains";

interface UseBalanceOfOptions {
  accountAddress: `0x${string}`;
  rpcUrl: string;
  chainId: number;
  decimals?: number;
}

export function useBalanceOf({
  accountAddress,
  rpcUrl,
  chainId,
  decimals = 18,
}: UseBalanceOfOptions) {
  const isCallEnabled = !!(accountAddress && rpcUrl && chainId);

  return useQuery({
    queryKey: [`${accountAddress}-${accountAddress}`, accountAddress, chainId],
    queryFn: async () => {
      const client = createPublicClient({
        chain: arbitrumSepolia,
        transport: http(rpcUrl),
      });

      const balance = await client.getBalance({
        address: accountAddress,
      });

      return formatUnits(balance, decimals);
    },
    refetchInterval: 10000,
    enabled: isCallEnabled,
  });
}
