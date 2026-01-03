import { QueryClient } from '@tanstack/react-query';

export default new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000, // 20초동안 refetch 안함
      retry: 0,
    },
  },
});
