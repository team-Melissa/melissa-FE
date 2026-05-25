import { useGetFeedInfinite } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { AdsBanner } from '@/src/modules/ads';
import styled from 'styled-components/native';
import FeedList from '../components/feed/FeedList';
import HomeHeader from '../components/header/HomeHeader';
import { isNonNullableDailySummaryResponse } from '../utils/typeGuard';

const FeedContainer = () => {
  const { data, isPending, hasNextPage, fetchNextPage } = useGetFeedInfinite(
    { limit: 5 },
    {
      query: {
        getNextPageParam: (lastPage) => lastPage.result?.pageInfo.nextCursor?.cursorDiaryId ?? null,
        refetchInterval: (query) => {
          const days = query.state.data?.pages.flatMap((data) => data.result?.days);
          const diaries = days?.flatMap((day) => day?.diaries);
          const isRefetch = diaries?.some((diary) => !!diary?.hashtag1 && !diary.imageUrl);
          return isRefetch ? 2000 : false;
        },
      },
    }
  );

  const calendarMonthData = data?.pages
    .flatMap((value) => value.result?.days)
    ?.filter(isNonNullableDailySummaryResponse);

  return (
    <Wrapper>
      <HomeHeader />
      <AdsBanner style={{ alignItems: 'center' }} />
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
  gap: 15px;
  background-color: ${COLOR.background};
`;
