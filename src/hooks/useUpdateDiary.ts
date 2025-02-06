import { threadSummary } from "@/src/apis/threadApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: threadSummary,
    onSuccess: ({ result }) => {
      queryClient.invalidateQueries({ queryKey: ["calendar", result.year, result.month] });
      queryClient.invalidateQueries({ queryKey: ["diaries", result.year, result.month] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateDiary;
