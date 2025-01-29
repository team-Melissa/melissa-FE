import { useQuery } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { checkNewUserFn } from "@/src/apis/loginApi";
import Loading from "@/src/components/ui/Loading";

/**
 * @description 토큰 검증 통과 유저의 초기화면을 결정하는 라우터
 */
function IndexRouter() {
  const { isPending, isSuccess, data } = useQuery({
    queryFn: checkNewUserFn,
    queryKey: ["check-new-user"],
  });

  if (isPending) {
    return <Loading />;
  }

  if (!isSuccess) {
    return <Redirect href="/login" />;
  }

  if (data.result) {
    return <Redirect href="/(app)/make-assistant" />;
  }
  return <Redirect href="/(app)/main" />;
}

export default IndexRouter;
