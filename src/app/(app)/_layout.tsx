import Loading from "@/src/components/ui/Loading";
import { useGetIsNewUser } from "@/src/hooks";
import { Redirect, Stack } from "expo-router";

/**
 * @description Stack navigator layout
 */
export default function ContextLayout() {
  const { isPending, isError } = useGetIsNewUser();

  if (isPending) return <Loading />;

  if (isError) return <Redirect href="/login" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
