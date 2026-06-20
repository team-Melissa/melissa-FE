import { useGetAgreementStatus } from '@/src/apis/_generated/serverAPI';

export const useGetAgreementState = () => {
  return useGetAgreementStatus({
    query: {
      select: (data) => data.result,
    },
  });
};
