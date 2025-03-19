import type BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect } from "expo-router";
import { type RefObject, useCallback } from "react";
import { BackHandler } from "react-native";

type TProps = {
  isBottomSheetOpen: boolean;
  bottomSheetRef: RefObject<BottomSheet>;
};

// TODO: 디렉토리 구조 개편 작업 때 이전될 예정
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
