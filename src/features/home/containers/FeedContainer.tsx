import { useGetFeedInfinite } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import styled from 'styled-components/native';
import FeedList from '../components/feed/FeedList';
import HomeHeader from '../components/header/HomeHeader';
import { isNonNullableDailySummaryResponse } from '../utils/typeGuard';

const FeedContainer = () => {
  const { data, isPending, hasNextPage, fetchNextPage } = useGetFeedInfinite(
    { limit: 5 },
    { query: { getNextPageParam: (lastPage) => lastPage.result?.pageInfo.nextCursor?.cursorDiaryId ?? null } }
  );

  const calendarMonthData = data?.pages
    .flatMap((value) => value.result?.days)
    ?.filter(isNonNullableDailySummaryResponse);

  return (
    <Wrapper>
      <HomeHeader />
      <FeedList
        monthData={calendarMonthData ?? []}
        isPending={isPending}
        hasNextPage={hasNextPage}
        onFetchNextPage={() => fetchNextPage({ cancelRefetch: false })}
      />
    </Wrapper>
  );
};

export default FeedContainer;

const Wrapper = styled.View`
  flex: 1;
  padding: 0 15px;
  gap: 25px;
  background-color: ${COLOR.background};
`;
