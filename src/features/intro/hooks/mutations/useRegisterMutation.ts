import { getCheckNewUserQueryKey } from '@/src/apis/_generated/serverAPI';
import endpoint from '@/src/constants/endpoint';
import toastMessage from '@/src/constants/toastMessage';
import axiosInstance from '@/src/libs/axiosInstance';
import { toast } from '@/src/modules/toast';
import { SuccessDTO } from '@/src/types/commonTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type RegisterDTO = SuccessDTO & { result: null };

/**
 * @deprecated codegen으로 마이그레이션
 */
const _postRegister = async () => {
  const { data } = await axiosInstance.post<RegisterDTO>(endpoint.setting.register);
  return data;
};

/**
 * @deprecated codegen으로 마이그레이션
 */
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _postRegister,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: [getCheckNewUserQueryKey()] });
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.registerSetting.error, options: { type: 'error' } });
    },
  });
};
