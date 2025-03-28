import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export const useIsKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);

  const handleKeyboardShow = () => setIsKeyboardOpen(true);
  const handleKeyboardHide = () => setIsKeyboardOpen(false);

  useEffect(() => {
    const showEventType = Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const hideEventType = Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    const didShowEvent = Keyboard.addListener(showEventType, handleKeyboardShow);
    const didHideEvent = Keyboard.addListener(hideEventType, handleKeyboardHide);

    return () => {
      didShowEvent.remove();
      didHideEvent.remove();
    };
  }, []);

  return isKeyboardOpen;
};
