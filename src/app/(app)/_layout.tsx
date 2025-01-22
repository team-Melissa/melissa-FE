import Splash from "@/src/components/ui/Splash";
import { Redirect, Slot } from "expo-router";

/**
 * @description 토큰 검증을 수행해 LoginPage / IndexPage 중 하나로 이동시키는 레이아웃
 */
function AuthLayout() {
  // 토큰이 존재하는지, 존재한다면 유효한지, 유효하지 않다면 refresh token으로 재발급 가능한지 여기서 체크
  // 체크하는동안 로딩 상태로 놔둠, 스플래시스크린 보여주면 될듯
  // 토큰 검증 성공하면 스택 네비게이터 렌더링해서 index 그리기, 토큰 검증 실패하면 로그인으로 리다이렉트
  // 아래 두 목업 변수는 토큰 검증 응답 값이 될 것
  const isLoading = false;
  const isAuthorized = true;

  if (isLoading) {
    return <Splash />;
  }

  if (!isAuthorized) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}

export default AuthLayout;
