import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

/**
 * Todo: [Github issue](https://github.com/facebook/react-native/issues/49759)가 해결되면, 해당 훅 제거
 */
export const useTempKeyboardAvoidingOnAndroid = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const handleKeyboardDidShow = (e: KeyboardEvent) => setKeyboardHeight(e.endCoordinates.height);

    const handleKeyboardDidHide = () => setKeyboardHeight(0);

    const showSubscription = Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow);
    const hideSubscription = Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (Platform.OS === "android" && Platform.Version > 34) return keyboardHeight;

  return 0;
};
