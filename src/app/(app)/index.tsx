import { useCheckNewUser } from '@/src/apis/_generated/serverAPI';
import { CommonLoading } from '@/src/core/Loading';
import { getIsTutorialFinished } from '@/src/libs/mmkv';
import { Redirect } from 'expo-router';

/**
 * @description 유저의 초기화면을 결정하는 라우터
 */
export default function IndexRouter() {
  const { data } = useCheckNewUser();

  if (data === undefined) return <CommonLoading />;

  if (data.result) return <Redirect href="/(app)/intro" />;

  if (!getIsTutorialFinished()) return <Redirect href="/(app)/tutorial" />;

  return <Redirect href="/(app)/(tab)/calendar" />;
}
