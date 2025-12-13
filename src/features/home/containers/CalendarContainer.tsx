import { COLOR } from '@/src/constants/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { CalendarList, DateData } from 'react-native-calendars';
import styled from 'styled-components/native';
import CalendarBottomSheet from '../components/calendar/CalendarBottomSheet';
import CalendarDay from '../components/calendar/CalendarDay';
import CalendarHeader from '../components/calendar/CalendarHeader';
import { HASHTAG_BUBBLE_INTERVAL } from '../constants';
import { useRandomizeHashtagBubble } from '../hooks/useRandomizeHashtagBubble';
import { getTodayDateData } from '../utils/getTodayDateData';

const CalendarContainer = () => {
  const [date, setDate] = useState(getTodayDateData());
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleMonthChange = (date: DateData) => {
    const { year, month } = date;
    setDate((prevDate) => ({ ...prevDate, year, month }));
  };

  const handleDayPress = (date: DateData) => {
    const { year, month, day } = date;
    setDate((prevDate) => ({ ...prevDate, year, month, day }));
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 0);
  };

  useRandomizeHashtagBubble({
    year: date.year,
    month: date.month,
    intervalMs: HASHTAG_BUBBLE_INTERVAL,
  });

  return (
    <Wrapper>
      <CalendarList
        horizontal
        staticHeader
        pagingEnabled
        pastScrollRange={50}
        futureScrollRange={50}
        theme={{ calendarBackground: 'transparent' }}
        headerStyle={{ display: 'none' }}
        customHeader={CalendarHeader}
        dayComponent={CalendarDay}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
      />
      <CalendarBottomSheet ref={bottomSheetRef} />
    </Wrapper>
  );
};

export default CalendarContainer;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${COLOR.background};
`;
