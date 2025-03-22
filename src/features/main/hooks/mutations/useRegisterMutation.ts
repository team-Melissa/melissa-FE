import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import toastMessage from "@/src/constants/toastMessage";
import showToast from "@/src/libs/showToast";
import { _register } from "../../apis/registerApi";
import { useEffect } from "react";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const isNewUser = useIsNewUserContext();

  const { mutate } = useMutation({
    mutationFn: _register,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["check-new-user"] });
    },
    onError: (error) => {
      console.error(error.response?.data);
      showToast(toastMessage.registerSetting.failed, "error");
    },
  });

  useEffect(() => {
    if (isNewUser) {
      console.log("새 유저 뮤테이션");
      mutate();
    }
  }, [isNewUser, mutate]);
};
