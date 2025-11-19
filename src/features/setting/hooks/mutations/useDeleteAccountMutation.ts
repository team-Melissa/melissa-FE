import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "@/src/apis/auth";
import { deleteExpoPushToken } from "@/src/apis/expoPushToken";
import { removeAccessToken, removeNotificationToken } from "@/src/libs/mmkv";
import { removeRefreshToken } from "@/src/libs/secureStorage";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: async (data) => {
      toast({ message: toastMessage.deleteAccount.success, options: { type: "success" } });
      console.log(data);

      try {
        await deleteExpoPushToken();
        removeNotificationToken();
      } catch (error) {
        console.error("Expo push token 삭제 도중 에러 발생: ", error);
      }

      await removeRefreshToken();
      removeAccessToken();

      queryClient.clear();
      router.replace("/login");
    },
    onError: (error) => {
      console.error(error.response?.data);
      toast({ message: toastMessage.deleteAccount.error, options: { type: "error" } });
    },
  });
};
