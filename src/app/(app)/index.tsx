import { Redirect } from "expo-router";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";

/**
 * @description 유저의 초기화면을 결정하는 라우터
 */
function IndexRouter() {
  const isNewUser = useIsNewUserContext();

  if (isNewUser) {
    return <Redirect href="/(app)/make-assistant" />;
  }
  return <Redirect href="/(app)/main" />;
}

export default IndexRouter;
