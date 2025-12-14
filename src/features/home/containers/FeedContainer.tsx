import { useGetCalendarView } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { getTodayDate } from '@/src/utils/date';
import { useState } from 'react';
import styled from 'styled-components/native';
import FeedList from '../components/feed/FeedList';
import HomeHeader from '../components/header/HomeHeader';
import { isNonNullableDailySummaryResponse } from '../utils/typeGuard';

const FeedContainer = () => {
  const todayDate = getTodayDate();
  const year = todayDate.year;
  const [month, setMonth] = useState<number>(todayDate.month);

  const { data } = useGetCalendarView({ year, month });
  const calendarMonthData = data?.result?.filter(isNonNullableDailySummaryResponse);

  return (
    <Wrapper>
      <HomeHeader month={month} onChange={setMonth} />
      <FeedList monthData={calendarMonthData ?? []} />
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
