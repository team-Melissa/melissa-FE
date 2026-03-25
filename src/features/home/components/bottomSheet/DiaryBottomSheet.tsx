import { mergeRefs } from '@/src/utils/mergeRefs';
import BottomSheet from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { forwardRef, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';
import { useBottomSheetBackHandler } from '../../hooks/useBottomSheetBackHandler';
import { useGetDiary } from '../../hooks/useGetDiary';
import type { TDateData } from '../../types';
import Backdrop from './Backdrop';
import DiaryBottomSheetList from './DiaryBottomSheetList';

type Props = {
  date: TDateData;
};

const SNAP_POINTS = ['60%', '90%'];

const DiaryBottomSheet = forwardRef<BottomSheet, Props>(({ date }, ref) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: calendarMonthData } = useGetDiary({
    year: date.year,
    month: date.month,
  });

  const dayData = calendarMonthData?.result?.find(
    (data) => data?.year === date.year && data.month === date.month && data.day === date.day
  );

  const getBottomSheetWidth = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const handleBottomSheetChange = (_: number, toIdx: number) => {
    setIsBottomSheetOpen(toIdx > -1);
  };

  useBottomSheetBackHandler({
    isOpen: isBottomSheetOpen,
    ref: bottomSheetRef,
  });

  return (
    <Portal>
      <StyledBottomSheet
        ref={mergeRefs(ref, bottomSheetRef)}
        index={-1}
        snapPoints={SNAP_POINTS}
        enableDynamicSizing={false}
        enableContentPanningGesture={true}
        enablePanDownToClose
        style={{ overflow: 'hidden' }}
        backgroundStyle={{ borderRadius: 40 }}
        handleIndicatorStyle={{ backgroundColor: '#EDEDED' }}
        backdropComponent={Backdrop}
        onAnimate={handleBottomSheetChange}
      >
        {dayData && (
          <Wrapper onLayout={getBottomSheetWidth}>
            <DiaryBottomSheetList
              key={`${date.year}-${date.month}-${date.day}`}
              width={width}
              dayData={dayData}
              onClose={() => bottomSheetRef.current?.close()}
            />
          </Wrapper>
        )}
      </StyledBottomSheet>
    </Portal>
  );
});

DiaryBottomSheet.displayName = 'DiaryBottomSheet';

export default DiaryBottomSheet;

const StyledBottomSheet = styled(BottomSheet)`
  border-radius: 40px;
`;

const Wrapper = styled.View`
  flex: 1;
`;
