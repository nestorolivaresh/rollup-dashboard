export type RollupPublic ={
    id: string;
    slug: string;
    name: string;
    environment: string;
    createdAt: string;
    updatedAt: string;
    chain: {
      type: string;
      stack: string;
      chainId: number;
      settlement: {
        name: string;
        chainId: number;
        nativeCurrency: {
          name: string;
          symbol: string;
          decimals: number;
        };
      };
      nativeCurrency: {
        name: string;
        symbol: string;
        isERC20: boolean;
        decimals: number;
        tokenAddress: string;
      };
      dataAvailability: {
        name: string;
        chainId: string;
      };
    };
    status: string;
    urls: {
      l2: {
        ws: string;
        http: string;
        explorer: string;
      };
      bridge: {
        ui: string;
        service: string;
      };
    };
    addresses: {
      accounts: {
        sequencer: string;
        settlement: string;
      };
      contracts: {
        l1: Record<string, string>;
        l2: Record<string, string>;
      };
    };
    config: Record<string, unknown>;
    public: boolean;
    integrations: unknown[];
    components: Array<{
      name: string;
      status: string;
    }>;
    bridge: Record<string, unknown>;
    isOneClick: boolean;
}