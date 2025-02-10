import useUserSetting from "@/src/hooks/useUserSetting";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import SettingPage from "@/src/pages/Setting";

/**
 * @description 유저 설정 페이지 라우터
 */
function SettingRouter(): JSX.Element {
  const { isPending, isError, data, refetch } = useUserSetting();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <CommonError titleText="사용자 설정 로딩 에러" buttonText="다시 로딩하기" onPress={refetch} />
    );
  }

  return <SettingPage data={data} />;
}

export default SettingRouter;
