import type { DailySummaryResponseDTO } from '@/src/apis/_generated/serverAPI.schemas';
import styled from 'styled-components/native';
import FeedDiaryList from './FeedDiaryList';

type Props = {
  monthData: NonNullable<DailySummaryResponseDTO>[];
};

const FeedList = ({ monthData }: Props) => {
  const getFeedItemKey = (dayData: NonNullable<DailySummaryResponseDTO>) => {
    return `${dayData.year}-${dayData.month}-${dayData.day}-${dayData.diaries.length}`;
  };

  return (
    <StyledScrollView contentContainerStyle={{ rowGap: 30 }}>
      {monthData.map((dayData) => (
        <FeedDiaryList key={getFeedItemKey(dayData)} dayData={dayData} />
      ))}
      <BottomTabArea />
    </StyledScrollView>
  );
};

export default FeedList;

const StyledScrollView = styled.ScrollView`
  width: 100%;
  padding: 0 18px;
`;

const BottomTabArea = styled.View`
  width: 100%;
  height: 50px;
`;
