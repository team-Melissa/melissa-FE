import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import Spinner from '@/src/core/Loading/Spinner';
import { useState } from 'react';
import { type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import styled from 'styled-components/native';
import FeedDiaryList from './FeedDiaryList';

type Props = {
  monthData: NonNullable<DailySummaryResponseDTO>[];
  isPending: boolean;
  hasNextPage: boolean;
  onFetchNextPage: () => void;
};

const FeedList = ({ monthData, isPending, hasNextPage, onFetchNextPage }: Props) => {
  const [width, setWidth] = useState<number | null>(null);

  const getFeedListWidth = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isCloseToBottom && hasNextPage && !isPending) {
      onFetchNextPage();
    }
  };

  const getKey = (dayData: NonNullable<DailySummaryResponseDTO>) =>
    `${dayData.year}-${dayData.month}-${dayData.day}-${dayData.diaries.at(0)?.diaryId}`;

  return (
    <StyledScrollView
      onLayout={getFeedListWidth}
      onScroll={handleScroll}
      scrollEventThrottle={500}
      contentContainerStyle={{ rowGap: 30 }}
    >
      {monthData.map((dayData) => (
        <FeedDiaryList key={getKey(dayData)} width={width} dayData={dayData} />
      ))}
      <BottomArea>{hasNextPage && <Spinner />}</BottomArea>
    </StyledScrollView>
  );
};

export default FeedList;

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

const BottomArea = styled.View`
  width: 100%;
  height: 50px;
  align-items: center;
`;
