import { removeAssistantFn } from "@/src/apis/aiProfileApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const useRemoveAssistant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeAssistantFn,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["assistant-list"] });
      Alert.alert("삭제되었습니다.");
    },
    onError: (error) => {
      console.error(error.response?.data);
      Alert.alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

export default useRemoveAssistant;
