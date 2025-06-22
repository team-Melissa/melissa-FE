import Loading from "@/src/components/ui/Loading";
import { useGetIsNewUser } from "@/src/hooks";
import { Redirect, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * @description ContextProvider들로 감싸는 레이아웃
 */
function ContextLayout() {
  const { isPending, isError } = useGetIsNewUser();
  console.log(isPending, isError);

  if (isPending) return <Loading />;

  if (isError) return <Redirect href="/login" />;

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}

export default ContextLayout;
