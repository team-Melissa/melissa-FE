import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { toast } from "@/src/modules/toast";
import toastMessage from "@/src/constants/toastMessage";
import { removeRefreshToken } from "@/src/libs/secureStorage";
import { removeAccessToken } from "@/src/libs/mmkv";

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
          toast({ message: toastMessage.accountNotFound, options: { type: "error" } });
          router.navigate("/login");
        } else if (code !== "401") {
          toast({ message: error.response?.data.message, options: { type: "error" } });
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
          toast({ message: toastMessage.accountNotFound, options: { type: "error" } });
          router.navigate("/login");
        }
      }
    },
  }),
});
