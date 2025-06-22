import Loading from "@/src/components/ui/Loading";
import { useGetIsNewUser } from "@/src/hooks";
import { Redirect } from "expo-router";

/**
 * @description 유저의 초기화면을 결정하는 라우터
 */
function IndexRouter() {
  const { data: isNewUser } = useGetIsNewUser();

  if (isNewUser === undefined) return <Loading />;

  if (isNewUser) return <Redirect href="/(app)/intro" />;

  return <Redirect href="/(app)/main" />;
}

export default IndexRouter;
