import { useGetCalendarView } from '@/src/apis/_generated/serverAPI';
import { COLOR } from '@/src/constants/theme';
import { Description1 } from '@/src/core/Txt';
import type { DateData } from 'react-native-calendars';
import type { BasicDayProps } from 'react-native-calendars/src/calendar/day/basic';
import styled from 'styled-components/native';
import { getTodayDateData } from '../../utils/getTodayDateData';
import { isCalendarDayData } from '../../utils/typeGuard';
import CalendarDayContent from './CalendarDayContent';

type Props = Omit<BasicDayProps, 'date'> & {
  date?: DateData;
};

const CalendarDay = ({ date, onPress }: Props) => {
  const today = getTodayDateData();

  const { data: calendarMonthData } = useGetCalendarView({
    year: date?.year ?? today.year,
    month: date?.month ?? today.month,
  });

  const handleDayPress = () => {
    onPress?.(date);
  };

  if (!date) return null;

  const calendarDayData = calendarMonthData?.result
    ?.filter(isCalendarDayData)
    .find(({ year, month, day }) => year === date.year && month === date.month && day === date.day);

  return (
    <Wrapper onPress={handleDayPress} style={{ zIndex: 100 - date.day }}>
      <StyledDescription1 $isToday={today.dateString === date.dateString}>{date.day}</StyledDescription1>
      <CalendarDayContent dayData={calendarDayData} />
    </Wrapper>
  );
};

export default CalendarDay;

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledDescription1 = styled(Description1)<{ $isToday: boolean }>`
  padding: 3px 7px;
  background-color: ${({ $isToday }) => ($isToday ? COLOR.sub1 : 'transparent')};
  color: ${({ $isToday }) => ($isToday ? COLOR.sub2 : COLOR.sub1)};
  border-radius: 12px;
`;
