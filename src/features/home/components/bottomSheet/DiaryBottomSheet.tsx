import { useGetCalendarView } from '@/src/apis/_generated/serverAPI';
import { mergeRefs } from '@/src/utils/mergeRefs';
import BottomSheet from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { useBottomSheetBackHandler } from '../../hooks/useBottomSheetBackHandler';
import type { TDateData } from '../../types';
import Backdrop from './Backdrop';
import DiaryBottomSheetList from './DiaryBottomSheetList';

type Props = {
  date: TDateData;
};

const SNAP_POINTS = ['90%'];

const DiaryBottomSheet = forwardRef<BottomSheet, Props>(({ date }, ref) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: calendarMonthData } = useGetCalendarView({
    year: date.year,
    month: date.month,
  });

  const dayData = calendarMonthData?.result?.find(
    (data) => data?.year === date.year && data.month === date.month && data.day === date.day
  );

  const handleBottomSheetChange = (idx: number) => {
    setIsBottomSheetOpen(idx > -1);
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
        enableContentPanningGesture={false}
        enablePanDownToClose
        style={{ overflow: 'hidden' }}
        backgroundStyle={{ borderRadius: 40 }}
        handleIndicatorStyle={{ backgroundColor: '#EDEDED' }}
        backdropComponent={Backdrop}
        onChange={handleBottomSheetChange}
      >
        {dayData && <DiaryBottomSheetList dayData={dayData} />}
      </StyledBottomSheet>
    </Portal>
  );
});

DiaryBottomSheet.displayName = 'DiaryBottomSheet';

export default DiaryBottomSheet;

const StyledBottomSheet = styled(BottomSheet)`
  border-radius: 40px;
`;
