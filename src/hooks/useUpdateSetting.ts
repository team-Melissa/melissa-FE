import { putUserSettingFn } from "@/src/apis/settingApi";
import { UserSettingResult } from "@/src/types/settingTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateSetting = (data: UserSettingResult) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserSettingFn,
    onMutate: (variable) => {
      // 여기서의 variable 객체는 mutationFn에게 전달된 variable에 해당!
      // 즉 여기서 낙관적 업데이트
      queryClient.setQueryData(["user-setting"], { ...data, result: variable });
    },
    onSuccess: (data) => {
      console.log("성공", data);
    },
    onError: (error) => {
      console.error(error.response?.data);
      // 요청에 실패했으므로 서버에서 값 가져와 롤백
      queryClient.invalidateQueries({ queryKey: ["user-setting"] });
      // Todo: 토스트 메시지로 에러 원인 알려주기
    },
  });
};

export default useUpdateSetting;
