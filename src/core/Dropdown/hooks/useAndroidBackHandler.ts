import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";

export const useAndroidBackHandler = (isOpen: boolean, callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isOpen) return;

    const onBackPress = () => {
      callbackRef.current();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [isOpen]);
};
