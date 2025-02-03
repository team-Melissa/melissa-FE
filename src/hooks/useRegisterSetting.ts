import { registerSettingFn } from "@/src/apis/settingApi";
import showToast from "@/src/libs/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      showToast("앱 초기 로딩 중 에러가 발생했어요.", "error");
    },
  });
};

export default useRegisterSetting;
