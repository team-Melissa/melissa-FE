import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';
import FeedDiaryList from './FeedDiaryList';

type Props = {
  monthData: NonNullable<DailySummaryResponseDTO>[];
};

const FeedList = ({ monthData }: Props) => {
  const [width, setWidth] = useState<number | null>(null);

  const getFeedListWidth = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const getFeedItemKey = (dayData: NonNullable<DailySummaryResponseDTO>) => {
    return `${dayData.year}-${dayData.month}-${dayData.day}-${dayData.diaries.length}`;
  };

  return (
    <StyledScrollView onLayout={getFeedListWidth} contentContainerStyle={{ rowGap: 30 }}>
      {monthData.map((dayData) => (
        <FeedDiaryList key={getFeedItemKey(dayData)} width={width} dayData={dayData} />
      ))}
      <BottomTabArea />
    </StyledScrollView>
  );
};

export default FeedList;

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

const BottomTabArea = styled.View`
  width: 100%;
  height: 50px;
`;
