import { removeAssistantFn } from "@/src/apis/aiProfileApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToast from "@/src/libs/showToast";

const useRemoveAssistant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAssistantFn,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
      showToast("서포터가 삭제되었습니다.", "success");
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast("서포터 삭제에 실패했습니다. 다시 시도해주세요.", "error");
    },
  });
};

export default useRemoveAssistant;
