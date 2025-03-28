import CommonError from "@/src/components/ui/CommonError";
import Loading from "@/src/components/ui/Loading";
import { useSettingQuery } from "@/src/features/setting/hooks/queries/useSettingQuery";
import SettingContainer from "@/src/features/setting/containers/SettingContainer";

/**
 * @description 유저 설정 페이지 라우터
 */
function SettingRouter(): JSX.Element {
  const { isPending, isError, data, refetch } = useSettingQuery();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <CommonError titleText="사용자 설정 로딩 에러" buttonText="다시 로딩하기" onPress={refetch} />;
  }

  return <SettingContainer data={data} />;
}

export default SettingRouter;
