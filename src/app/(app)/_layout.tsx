import { Redirect, Slot } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { checkNewUserFn } from "@/src/apis/loginApi";
import Loading from "@/src/components/ui/Loading";

/**
 * @description 토큰 검증을 수행해 LoginPage와 IndexPage 중 하나로 이동시키는 레이아웃
 */
function RootLayout() {
  // 토큰이 존재하는지, 존재한다면 유효한지 검증
  // 체크하는동안 로딩 상태로 스플래시스크린 렌더링
  // 토큰 검증 성공하면 IndexRouter로 이동, 토큰 검증 실패하면 로그인으로 리다이렉트
  const { isPending, isError } = useQuery({
    queryFn: checkNewUserFn,
    queryKey: ["check-new-user"],
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}

export default RootLayout;
