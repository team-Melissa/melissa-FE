import { Slot } from "expo-router";
import IsNewUserProvider from "@/src/contexts/IsNewUserProvider";

/**
 * @description ContextProvider들로 감싸는 레이아웃
 */
function ContextLayout() {
  return (
    <IsNewUserProvider>
      <Slot />
    </IsNewUserProvider>
  );
}

export default ContextLayout;
