import { useMutation, useQueryClient } from "@tanstack/react-query";
import endpoint from "@/src/constants/endpoint";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import axiosInstance from "@/src/libs/axiosInstance";
import type { UserSettingDTO } from "../../types/settingTypes";

type Params = {
  sleepTime: string;
  notificationTime: string;
  notificationSummary: boolean;
};

const _setting = async (params: Params) => {
  const { data } = await axiosInstance.put<UserSettingDTO>(endpoint.setting.setting, params);
  return data;
};

export const useSettingMutation = (data: UserSettingDTO) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: _setting,
    onMutate: (params) => {
      queryClient.setQueryData(["user-setting"], { ...data, result: params });
    },
    onSuccess: (data) => {
      console.log("성공", data);
      toast(toastMessage.updateSetting.success);
    },
    onError: (error) => {
      console.error(error.response?.data);
      queryClient.invalidateQueries({ queryKey: ["user-setting"] });
      toast(toastMessage.updateSetting.failed);
    },
  });
};
