import { getUserSettingFn } from "@/src/apis/settingApi";
import { useQuery } from "@tanstack/react-query";

const useUserSetting = () => {
  return useQuery({
    queryFn: getUserSettingFn,
    queryKey: ["user-setting"],
    staleTime: 5 * 60 * 1000,
  });
};

export default useUserSetting;
