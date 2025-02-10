import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import showToast from "@/src/libs/showToast";
import { removeRefreshToken } from "@/src/libs/secureStorage";
import { removeAccessToken, removeAiProfileId } from "@/src/libs/mmkv";
import toastMessage from "@/src/constants/toastMessage";

export default new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000, // 20초동안 refetch 안함
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: async (error) => {
      console.log("글로벌 query 에러");
      if (error.response?.data) {
        console.log(error.response.data);
        const code = error.response.data.code;
        if (code === "AUTH4006") {
          // 다른 기기에서 이미 삭제된 계정인 경우
          await removeRefreshToken();
          removeAccessToken();
          removeAiProfileId();
          showToast(toastMessage.accountNotFound, "error");
          router.navigate("/login");
        } else if (code !== "401") {
          showToast(error.response?.data.message, "error");
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: async (error) => {
      console.log("글로벌 mutation 에러");
      if (error.response?.data) {
        const code = error.response.data.code;
        if (code === "AUTH4006") {
          // 다른 기기에서 이미 삭제된 계정인 경우
          await removeRefreshToken();
          removeAccessToken();
          removeAiProfileId();
          showToast(toastMessage.accountNotFound, "error");
          router.navigate("/login");
        }
      }
    },
  }),
});
