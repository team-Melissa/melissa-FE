import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { useState } from 'react';
import { type LayoutChangeEvent } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { isRequiredDiaryDetail } from '../../utils/typeGuard';
import FeedDiaryListItem from './FeedDiaryListItem';

type Props = {
  width: number | null;
  dayData: NonNullable<DailySummaryResponseDTO>;
};

const FeedDiaryList = ({ width, dayData }: Props) => {
  const { year, month, day } = dayData;
  const [height, setHeight] = useState(500);

  const getMaxHeight = (e: LayoutChangeEvent) => {
    const layoutHeight = e.nativeEvent.layout.height;
    setHeight((height) => Math.max(layoutHeight, height));
  };

  const diaries = dayData.diaries.filter(isRequiredDiaryDetail);
  if (!width || diaries.length === 0) return null;

  return (
    <Carousel
      width={width}
      height={height}
      data={diaries}
      loop={false}
      renderItem={({ item }) => (
        <FeedDiaryListItem date={{ year, month, day }} diaryData={item} onLayout={getMaxHeight} />
      )}
      onConfigurePanGesture={(gestureChain) => gestureChain.activeOffsetX([-10, 10])}
    />
  );
};

export default FeedDiaryList;
