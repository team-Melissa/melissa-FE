import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeAssistantFn } from "@/src/apis/aiProfileApi";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";

const useRemoveAssistant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAssistantFn,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
      showToast(toastMessage.removeAssistant.success, "success");
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.removeAssistant.failed, "error");
    },
  });
};

export default useRemoveAssistant;
