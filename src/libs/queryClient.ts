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
        if (
          code === "COMMON4002" ||
          code === "COMMON4003" ||
          code === "USER4001" ||
          code === "USER4002" ||
          code === "USER4004" ||
          code === "USER4006" ||
          code === "SETTING4001" ||
          code === "PROFILE4001" ||
          code === "AUTH4006"
        ) {
          await removeRefreshToken();
          removeAccessToken();
          removeAiProfileId();
          showToast(toastMessage.accountError, "error");
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
        if (
          code === "COMMON4002" ||
          code === "COMMON4003" ||
          code === "USER4001" ||
          code === "USER4002" ||
          code === "USER4004" ||
          code === "USER4006" ||
          code === "SETTING4001" ||
          code === "PROFILE4001" ||
          code === "AUTH4006"
        ) {
          await removeRefreshToken();
          removeAccessToken();
          removeAiProfileId();
          showToast(toastMessage.accountError, "error");
          router.navigate("/login");
        }
      }
    },
  }),
});
