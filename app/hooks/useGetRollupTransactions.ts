import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_METRICS_URL } from '../constants/api';

export const useGetRollupTransactions = (rollupId: string) => {
  const isCallEnabled = !!rollupId;
  return useQuery({
    queryKey: ['rollup', rollupId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_METRICS_URL}?ids[]=${rollupId}`);
      return data;
    },
    staleTime: 60000,
    refetchInterval: 500000,
    enabled: isCallEnabled,
  });
};