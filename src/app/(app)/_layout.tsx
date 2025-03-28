import { Stack } from "expo-router";
import IsNewUserProvider from "@/src/contexts/isNewUserProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * @description ContextProvider들로 감싸는 레이아웃
 */
function ContextLayout() {
  return (
    <IsNewUserProvider>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </IsNewUserProvider>
  );
}

export default ContextLayout;
