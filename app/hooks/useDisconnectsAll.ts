// Extracted from: https://github.com/rainbow-me/rainbowkit/issues/1877#issuecomment-2019242061

import { useConnections, useDisconnect } from "wagmi";

export const useDisconnectAll = () => {
  const connections = useConnections();
  const { disconnect } = useDisconnect();
  const disconnectsAll = () => {
    connections.forEach(({ connector }) => {
      disconnect({ connector });
    });
  };
  return { disconnectsAll };
};
