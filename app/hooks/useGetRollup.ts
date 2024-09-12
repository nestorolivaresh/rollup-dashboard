import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export const useGetRollup = (rollupName: string) => {
  const isCallEnabled = !!rollupName;
  return useQuery({
    queryKey: ["rollupTransactions", rollupName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_BASE_URL}/deployments/${rollupName}`
      );
      return data;
    },
    staleTime: 60000,
    refetchInterval: 500000,
    enabled: isCallEnabled,
  });
};
