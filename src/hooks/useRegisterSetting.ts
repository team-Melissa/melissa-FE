import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerSettingFn } from "@/src/apis/settingApi";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";

const useRegisterSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerSettingFn,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["check-new-user"] });
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.registerSetting.failed, "error");
    },
  });
};

export default useRegisterSetting;
