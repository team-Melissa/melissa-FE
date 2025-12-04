import { useCheckNewUser } from '@/src/apis/_generated/serverAPI';
import { CommonLoading } from '@/src/core/Loading';
import { Redirect, Stack } from 'expo-router';

/**
 * @description Stack navigator layout
 */
export default function ContextLayout() {
  const { isPending, isError } = useCheckNewUser();

  if (isPending) return <CommonLoading />;

  if (isError) return <Redirect href="/login" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
