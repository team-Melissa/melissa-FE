import type BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect } from 'expo-router';
import { useCallback, type RefObject } from 'react';
import { BackHandler } from 'react-native';

type Props = {
  isOpen: boolean;
  ref: RefObject<BottomSheet>;
};

export const useBottomSheetBackHandler = ({ isOpen, ref }: Props) => {
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (!isOpen) return false;
        ref.current?.close();
        return true;
      };

      const hardwareBackPressEvent = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => hardwareBackPressEvent.remove();
    }, [isOpen, ref])
  );
};
