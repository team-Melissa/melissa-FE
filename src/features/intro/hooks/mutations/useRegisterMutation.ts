import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import { IS_NEW_USER_QUERY_KEY } from "@/src/hooks";
import axiosInstance from "@/src/libs/axiosInstance";
import { SuccessDTO } from "@/src/types/commonTypes";
import endpoint from "@/src/constants/endpoint";

type RegisterDTO = SuccessDTO & { result: null };

const _postRegister = async () => {
  const { data } = await axiosInstance.post<RegisterDTO>(endpoint.setting.register);
  return data;
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _postRegister,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: [IS_NEW_USER_QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.registerSetting.error, options: { type: "error" } });
    },
  });
};
