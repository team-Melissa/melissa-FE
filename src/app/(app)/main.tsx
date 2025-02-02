import { useEffect } from "react";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import useRegisterSetting from "@/src/hooks/useRegisterSetting";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import CalendarPage from "@/src/pages/Calendar";

/**
 * @description 달력 나오는 페이지의 라우터
 */
function MainRouter() {
  const isNewUser = useIsNewUserContext();
  const { isPending, isError, mutate } = useRegisterSetting();

  // 초기 유저의 기본 설정값 등록
  useEffect(() => {
    if (isNewUser) {
      mutate();
    }
  }, [isNewUser, mutate]);

  // 초기 유저 기본 설정값 등록 로딩 / 에러 관리
  if (isNewUser) {
    if (isPending) {
      return <Loading />;
    }

    if (isError) {
      return (
        <CommonError
          titleText="앱 초기 로딩 중 에러가 발생했어요."
          buttonText="다시 로딩하기"
          onPress={() => mutate()}
        />
      );
    }
  }

  return <CalendarPage />;
}
export default MainRouter;
