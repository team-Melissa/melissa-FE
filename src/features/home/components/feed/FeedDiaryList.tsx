import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import PagerView from 'react-native-pager-view';
import styled from 'styled-components/native';
import { isRequiredDiaryDetail } from '../../utils/typeGuard';
import FeedDiaryListItem from './FeedDiaryListItem';

type Props = {
  dayData: NonNullable<DailySummaryResponseDTO>;
};

const FeedDiaryList = ({ dayData }: Props) => {
  const { year, month, day } = dayData;
  const [maxHeight, setMaxHeight] = useState(600);

  const getMaxHeight = (e: LayoutChangeEvent) => {
    const layoutHeight = e.nativeEvent.layout.height;
    setMaxHeight((maxHeight) => Math.max(layoutHeight, maxHeight));
  };

  const diaries = dayData.diaries.filter(isRequiredDiaryDetail);

  return (
    <Wrapper $height={maxHeight}>
      <StyledPagerView initialPage={0} pageMargin={30}>
        {diaries.map((diary) => (
          <FeedDiaryListItem
            key={diary.diaryId}
            date={{ year, month, day }}
            diaryData={diary}
            onLayout={getMaxHeight}
          />
        ))}
      </StyledPagerView>
    </Wrapper>
  );
};

export default FeedDiaryList;

const Wrapper = styled.View<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
`;

const StyledPagerView = styled(PagerView)`
  flex: 1;
`;
