import { mergeRefs } from '@/src/utils/mergeRefs';
import BottomSheet from '@gorhom/bottom-sheet';
import { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { useBottomSheetBackHandler } from '../../hooks/useBottomSheetBackHandler';

type Props = {};

const SNAP_POINTS = ['60%', '90%'];

const CalendarBottomSheet = forwardRef<BottomSheet, Props>(({}, ref) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheetChange = (idx: number) => {
    setIsBottomSheetOpen(idx > -1);
  };

  useBottomSheetBackHandler({
    isOpen: isBottomSheetOpen,
    ref: bottomSheetRef,
  });

  return (
    <BottomSheet
      ref={mergeRefs(ref, bottomSheetRef)}
      index={-1}
      snapPoints={SNAP_POINTS}
      enableDynamicSizing={false}
      enablePanDownToClose
      onChange={handleBottomSheetChange}
    >
      <Wrapper></Wrapper>
    </BottomSheet>
  );
});

CalendarBottomSheet.displayName = 'CalendarBottomSheet';

export default CalendarBottomSheet;

const Wrapper = styled.View`
  flex: 1;
`;
