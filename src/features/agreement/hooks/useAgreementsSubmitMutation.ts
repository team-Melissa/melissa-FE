import {
  getGetAgreementScreenQueryKey,
  getGetAgreementStatusQueryKey,
  useSubmitAgreements,
} from '@/src/apis/_generated/serverAPI';
import toastMessage from '@/src/constants/toastMessage';
import { toast } from '@/src/modules/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export const useAgreementsSubmitMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useSubmitAgreements({
    mutation: {
      onSuccess: async () => {
        toast({ message: toastMessage.agreement.success, options: { type: 'success' } });
        await queryClient.invalidateQueries({ queryKey: getGetAgreementStatusQueryKey() });
        await queryClient.invalidateQueries({ queryKey: getGetAgreementScreenQueryKey() });
        router.replace('/(app)');
      },
      onError: () => {
        toast({ message: toastMessage.agreement.error, options: { type: 'error' } });
      },
    },
  });
};
