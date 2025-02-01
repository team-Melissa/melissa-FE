import { registerSettingFn } from "@/src/apis/settingApi";
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
    },
  });
};

export default useRegisterSetting;
