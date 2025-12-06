import { COLOR } from '@/src/constants/theme';
import { useState } from 'react';
import { CalendarList, DateData } from 'react-native-calendars';
import styled from 'styled-components/native';
import CalendarDay from '../components/calendar/CalendarDay';
import CalendarHeader from '../components/calendar/CalendarHeader';
import { HASHTAG_BUBBLE_INTERVAL } from '../constants';
import { useRandomizeHashtagBubble } from '../hooks/useRandomizeHashtagBubble';

const CalendarContainer = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  useRandomizeHashtagBubble({ year, month, intervalMs: HASHTAG_BUBBLE_INTERVAL });

  const handleMonthChange = (date: DateData) => {
    setYear(date.year);
    setMonth(date.month);
  };

  return (
    <Wrapper>
      <CalendarList
        onMonthChange={handleMonthChange}
        horizontal
        pagingEnabled
        pastScrollRange={50}
        futureScrollRange={50}
        theme={{ calendarBackground: 'transparent' }}
        headerStyle={{ display: 'none' }}
        staticHeader
        customHeader={CalendarHeader}
        dayComponent={CalendarDay}
      />
    </Wrapper>
  );
};

export default CalendarContainer;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${COLOR.background};
`;
