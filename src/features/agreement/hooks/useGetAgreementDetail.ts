import { useGetAgreementScreen } from '@/src/apis/_generated/serverAPI';
import { isAgreementDetail } from '../utils/typeGuard';

export const useGetAgreementDetail = () => {
  return useGetAgreementScreen({
    query: {
      select: (data) => {
        return isAgreementDetail(data.result) ? data.result : undefined;
      },
    },
  });
};
