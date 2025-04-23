import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsNewUserContext } from "@/src/contexts/isNewUserProvider";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import { _register } from "../../apis/registerApi";

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
      toast(toastMessage.registerSetting.failed);
    },
  });

  useEffect(() => {
    if (isNewUser) {
      console.log("새 유저 뮤테이션");
      mutate();
    }
  }, [isNewUser, mutate]);
};
