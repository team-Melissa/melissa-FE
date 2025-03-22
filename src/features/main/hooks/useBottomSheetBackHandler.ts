import type BottomSheet from "@gorhom/bottom-sheet";
import { type RefObject, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { BackHandler } from "react-native";

type TProps = {
  isBottomSheetOpen: boolean;
  bottomSheetRef: RefObject<BottomSheet>;
};

export const useBottomSheetBackHandler = ({ isBottomSheetOpen, bottomSheetRef }: TProps) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isBottomSheetOpen) {
          bottomSheetRef.current?.close();
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [bottomSheetRef, isBottomSheetOpen])
  );
};
