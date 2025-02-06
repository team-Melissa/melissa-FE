import { useMutation, useQueryClient } from "@tanstack/react-query";
import { threadSummary } from "@/src/apis/threadApi";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";

const useUpdateDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: threadSummary,
    onSuccess: ({ result }) => {
      showToast(toastMessage.updateDiary.success, "success");
      queryClient.invalidateQueries({ queryKey: ["calendar", result.year, result.month] });
      queryClient.invalidateQueries({ queryKey: ["diaries", result.year, result.month] });
    },
    onError: (error) => {
      console.log(error);
      showToast(toastMessage.updateDiary.failed, "error");
    },
  });
};

export default useUpdateDiary;
