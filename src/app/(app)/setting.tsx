import { getUserSettingFn } from "@/src/apis/settingApi";
import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import SettingPage from "@/src/pages/Setting";
import { useQuery } from "@tanstack/react-query";

/**
 * @description 유저 설정 페이지 라우터
 */
function SettingRouter(): JSX.Element {
  const { isPending, isError, data, refetch } = useQuery({
    queryFn: getUserSettingFn,
    queryKey: ["user-setting"],
    staleTime: 5 * 60 * 1000,
  });

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
