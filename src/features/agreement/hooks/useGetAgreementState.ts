import { useGetAgreementStatus } from '@/src/apis/_generated/serverAPI';
import { isAgreementState } from '../utils/typeGuard';

export const useGetAgreementState = () => {
  return useGetAgreementStatus({
    query: {
      select: (data) => {
        return isAgreementState(data.result) ? data.result : undefined;
      },
    },
  });
};
