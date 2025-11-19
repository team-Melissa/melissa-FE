import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeRefreshToken } from "@/src/libs/secureStorage";
import { removeAccessToken, removeNotificationToken } from "@/src/libs/mmkv";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import { logout } from "@/src/apis/auth";
import { deleteExpoPushToken } from "@/src/apis/expoPushToken";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      toast({ message: toastMessage.logout.success, options: { type: "success" } });
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
      toast({ message: toastMessage.logout.error, options: { type: "error" } });
    },
  });
};
