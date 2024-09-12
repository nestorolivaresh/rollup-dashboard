import { Chain } from "viem";

export const arbitrumSepolia = {
  name: "Arbitrum Sepolia",
  id: 421614,
  nativeCurrency: {
    name: "Gelato Custom Gas Token",
    symbol: "CGT",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.arb-blueberry.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "Arbitrum Sepolia Explorer",
      url: "https://arb-blueberry.gelatoscout.com/",
    },
  },
} as const satisfies Chain;
