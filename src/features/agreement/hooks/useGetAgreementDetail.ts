import { useGetAgreementScreen } from '@/src/apis/_generated/serverAPI';

export const useGetAgreementDetail = () => {
  return useGetAgreementScreen({
    query: {
      select: (data) => data.result,
    },
  });
};
