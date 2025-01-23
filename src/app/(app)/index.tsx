import { Redirect } from "expo-router";

/**
 * @description 토큰 검증 통과 유저의 초기화면을 결정하는 라우터
 */
function IndexRouter() {
  const isFirstUser = false; // 이것 역시 토큰 검증 결과에서 반환받을 값

  if (isFirstUser) {
    return <Redirect href="/(app)/make-assistant" />;
  }
  return <Redirect href="/(app)/main" />;
}

export default IndexRouter;
