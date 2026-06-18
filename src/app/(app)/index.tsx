import { useCheckNewUser } from '@/src/apis/_generated/serverAPI';
import { CommonLoading } from '@/src/core/Loading';
import { useGetAgreementState } from '@/src/features/agreement/hooks/useGetAgreementState';
import { getIsTutorialFinished } from '@/src/libs/mmkv';
import { Redirect } from 'expo-router';

/**
 * @description 유저의 초기화면을 결정하는 라우터
 */
export default function IndexRouter() {
  const { data: isNewUser } = useCheckNewUser();
  const { data: agreementStatus } = useGetAgreementState();

  if (isNewUser === undefined || agreementStatus === undefined) return <CommonLoading />;

  if (agreementStatus.agreementRequired) return <Redirect href="/(app)/agreement" />;

  if (isNewUser.result) return <Redirect href="/(app)/intro" />;

  if (!getIsTutorialFinished()) return <Redirect href="/(app)/tutorial" />;

  return <Redirect href="/(app)/(tab)/calendar" />;
}
