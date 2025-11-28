import Loading from "@/src/components/ui/Loading";
import { useGetIsNewUser } from "@/src/hooks";
import { Redirect, Stack } from "expo-router";

/**
 * @description Provider들로 감싸는 레이아웃
 */
export default function ContextLayout() {
  const { isPending, isError } = useGetIsNewUser();

  if (isPending) return <Loading />;

  if (isError) return <Redirect href="/login" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
