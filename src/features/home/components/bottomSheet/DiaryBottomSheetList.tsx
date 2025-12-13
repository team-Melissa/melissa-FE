import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';

import Carousel from 'react-native-reanimated-carousel';
import { isRequiredDiaryDetail } from '../../utils/typeGuard';
import DiaryBottomSheetListItem from './DiaryBottomSheetListItem';

type Props = {
  width: number | null;
  dayData: NonNullable<DailySummaryResponseDTO>;
};

const DiaryBottomSheetList = ({ width, dayData }: Props) => {
  const { year, month, day } = dayData;

  const diaries = dayData.diaries.filter(isRequiredDiaryDetail);
  if (!width || diaries.length === 0) return null;

  return (
    <Carousel
      width={width}
      data={diaries}
      loop={false}
      renderItem={({ item }) => <DiaryBottomSheetListItem date={{ year, month, day }} diaryData={item} />}
      onConfigurePanGesture={(gestureChain) => gestureChain.activeOffsetX([-10, 10])}
    />
  );
};

export default DiaryBottomSheetList;
